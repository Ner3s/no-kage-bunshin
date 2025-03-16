package utils

import (
	"no-kage-bunshin/backend/models"
	"sort"
	"time"
)

func DetectOldestFile(files []models.FileInfo) ([]models.FileInfo, error) {
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
