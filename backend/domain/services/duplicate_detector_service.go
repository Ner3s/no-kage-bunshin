package services

import (
	"no-kage-bunshin/backend/domain/entities"
)

type DuplicateDetectorService interface {
	DetectDuplicates(files []entities.FileInfo) ([]entities.DuplicateFile, error)
	DetectOriginalFile(files []entities.FileInfo) ([]entities.FileInfo, error)
}
