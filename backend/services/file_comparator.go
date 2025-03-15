package services

import (
	"crypto/sha256"
	"fmt"
	"io"
	"no-kage-bunshin/backend/utils"
	"os"
	"path/filepath"
)

type DuplicateFile struct {
	Original   string     `json:"original"`
	Duplicates []FileInfo `json:"duplicates"`
}

func FindDuplicateFiles(folderPath string) ([]DuplicateFile, error) {
	files, err := ListFiles(folderPath)
	if err != nil {
		return nil, err
	}

	hashes := make(map[string][]FileInfo)
	// duplicates := make(map[string][]FileInfo)

	for _, file := range files {
		if file.IsDir {
			continue
		}

		hash, err := computeFileHash(file.Path)
		if err != nil {
			fmt.Println("Erro ao calcular hash:", err)
			continue
		}

		fileInfo := FileInfo{
			Path:       file.Path,
			Size:       file.Size,
			HumanSize:  utils.FormatSize(file.Size),
			Filename:   filepath.Base(file.Path),
			FolderPath: filepath.Dir(file.Path),
			IsDir:      file.IsDir,
		}

		hashes[hash] = append(hashes[hash], fileInfo)
	}

	var result []DuplicateFile
	for hash, files := range hashes {
		if len(files) > 1 {
			result = append(result, DuplicateFile{
				Original:   hash,
				Duplicates: files,
			})
		}

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
