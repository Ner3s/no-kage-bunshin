package services

import (
	"crypto/sha256"
	"fmt"
	"io"
	"os"
)

type DuplicateFile struct {
	Original   string   `json:"original"`
	Duplicates []string `json:"duplicates"`
}

func FindDuplicateFiles(folderPath string) ([]DuplicateFile, error) {
	files, err := ListFiles(folderPath)
	if err != nil {
		return nil, err
	}

	hashes := make(map[string]string)
	duplicates := make(map[string][]string)

	for _, file := range files {
		if file.IsDir {
			continue
		}

		hash, err := computeFileHash(file.Path)
		if err != nil {
			fmt.Println("Erro ao calcular hash:", err)
			continue
		}

		if original, exists := hashes[hash]; exists {
			duplicates[original] = append(duplicates[original], file.Path)
		} else {
			hashes[hash] = file.Path
		}
	}

	var result []DuplicateFile
	for original, dupls := range duplicates {
		result = append(result, DuplicateFile{
			Original:   original,
			Duplicates: dupls,
		})
	}

	return result, nil
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
