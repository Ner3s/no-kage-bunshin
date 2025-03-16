package services

import (
	"fmt"
	"no-kage-bunshin/backend/models"
	"no-kage-bunshin/backend/utils"
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

		hash, err := utils.ComputeFileHash(file.Path)
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

			files, err := utils.DetectOldestFile(files)
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
