package utils

import (
	"os"
	"path/filepath"
)

func ExtractAndCompare(files []string, tempDir string) ([]string, error) {
	var extractedFiles []string

	for _, file := range files {
		if IsCompressed(file) {
			destFolder := filepath.Join(tempDir, filepath.Base(file))
			err := os.MkdirAll(destFolder, os.ModePerm)
			if err != nil {
				return nil, err
			}

			err = ExtractZIP(file, destFolder)
			if err != nil {
				return nil, err
			}

			extractedFiles = append(extractedFiles, destFolder)
		}
	}

	return extractedFiles, nil
}
