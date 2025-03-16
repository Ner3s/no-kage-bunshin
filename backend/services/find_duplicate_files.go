package services

import (
	"crypto/sha256"
	"fmt"
	"io"
	"no-kage-bunshin/backend/models"
	"os"
	"sort"
	"time"
)

func FindDuplicateFiles(folderPath string) ([]models.DuplicateFile, []models.FileInfo, error) {
	files, err := ListFiles(folderPath)
	if err != nil {
		return nil, nil, err
	}

	hashes := make(map[string][]models.FileInfo)
	allFiles := make([]models.FileInfo, 0)

	for _, file := range files {
		if file.IsDir {
			continue
		}

		hash, err := computeFileHash(file.Path)
		if err != nil {
			fmt.Println("Erro ao calcular hash:", err)
			continue
		}

		hashes[hash] = append(hashes[hash], file)
		allFiles = append(allFiles, file)
	}

	var result []models.DuplicateFile
	for hash, files := range hashes {
		if len(files) > 1 {

			files, err := detectOldestFile(files)
			if err != nil {
				return nil, nil, err
			}

			original := files[0]
			duplicates := files[1:]

			result = append(result, models.DuplicateFile{
				Hash:       hash,
				Original:   original,
				Duplicates: duplicates,
			})
		}

	}

	return result, allFiles, nil
}

func detectOldestFile(files []models.FileInfo) ([]models.FileInfo, error) {
	sort.Slice(files, func(i, j int) bool {
		timeI, err := time.Parse(time.RFC3339, files[i].CreatedAt)
		if err != nil {
			return false
		}

		timeJ, err := time.Parse(time.RFC3339, files[j].CreatedAt)
		if err != nil {
			return false
		}

		return timeI.Before(timeJ)
	})

	return files, nil
}

func computeFileHash(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	defer file.Close()

	hasher := sha256.New()
	if _, err := io.Copy(hasher, file); err != nil {
		return "", err
	}

	return fmt.Sprintf("%x", hasher.Sum(nil)), nil
}
