package utils

import "no-kage-bunshin/backend/models"

func CombineClones(originalClones, extractedClones []models.DuplicateFile) []models.DuplicateFile {
	cloneMap := make(map[string]models.DuplicateFile)

	for _, clone := range originalClones {
		cloneMap[clone.Hash] = clone
	}

	for _, clone := range extractedClones {
		if existingClone, exists := cloneMap[clone.Hash]; exists {
			existingClone.Duplicates = append(existingClone.Duplicates, clone.Duplicates...)
			cloneMap[clone.Hash] = existingClone
		} else {
			cloneMap[clone.Hash] = clone
		}
	}

	var combinedClones []models.DuplicateFile
	for _, clone := range cloneMap {
		combinedClones = append(combinedClones, clone)
	}

	return combinedClones
}
