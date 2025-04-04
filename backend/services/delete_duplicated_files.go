package services

import (
	"fmt"
	"no-kage-bunshin/backend/utils"
	"os"
	"sync"
)

func DeleteDuplicatedFiles(filesPaths []string, isPermanent bool) (string, error) {
	if len(filesPaths) == 0 {
		return "No files to process", nil
	}

	var wg sync.WaitGroup
	errorChan := make(chan error, len(filesPaths))

	for _, filePath := range filesPaths {
		wg.Add(1)
		go func(path string) {
			defer wg.Done()
			var err error
			if isPermanent {
				err = os.Remove(path)
			} else {
				err = utils.MoveToTrash(path)
			}
			if err != nil {
				errorChan <- fmt.Errorf("failed to %s %s: %w",
					operation(isPermanent), path, err)
			}
		}(filePath)
	}

	wg.Wait()
	close(errorChan)

	if err := <-errorChan; err != nil {
		return "", err
	}

	action := "deleted"
	if !isPermanent {
		action = "moved to trash"
	}
	return fmt.Sprintf("Successfully %s duplicated file(s)", action), nil
}

func operation(isPermanent bool) string {
	if isPermanent {
		return "delete"
	}
	return "move to trash"
}
