package utils

import "no-kage-bunshin/backend/models"

func CombineClones(originalClones, extractedClones []models.DuplicateFile) []models.DuplicateFile {
	cloneMap := make(map[string]models.DuplicateFile)

	for _, clone := range originalClones {
		cloneMap[clone.Original] = clone
	}

	for _, clone := range extractedClones {
		if existingClone, exists := cloneMap[clone.Original]; exists {
			existingClone.Duplicates = append(existingClone.Duplicates, clone.Duplicates...)
			cloneMap[clone.Original] = existingClone
		} else {
			cloneMap[clone.Original] = clone
		}
	}

	var combinedClones []models.DuplicateFile
	for _, clone := range cloneMap {
		combinedClones = append(combinedClones, clone)
	}

	return combinedClones
}
