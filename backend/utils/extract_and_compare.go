package utils

import (
	"no-kage-bunshin/backend/models"
	"os"
	"path/filepath"
)

func ExtractAndCompare(files []models.FileInfo, tempDir string) ([]string, error) {
	var extractedFiles []string

	for _, file := range files {
		if IsCompressed(file.Path) {
			destFolder := filepath.Join(tempDir, filepath.Base(file.Path))
			err := os.MkdirAll(destFolder, os.ModePerm)
			if err != nil {
				return nil, err
			}

			err = ExtractZIP(file.Path, destFolder)
			if err != nil {
				return nil, err
			}

			extractedFiles = append(extractedFiles, destFolder)
		}
	}

	return extractedFiles, nil
}
