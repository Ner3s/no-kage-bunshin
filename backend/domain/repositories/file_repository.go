package repositories

import "no-kage-bunshin/backend/domain/entities"

type FileRepository interface {
	ListFiles(folderPath string) ([]entities.FileInfo, error)
	FindDuplicates(folderPath string) ([]entities.DuplicateFile, []entities.FileInfo, error)
	DeleteFiles(filesPaths []string, isPermanent bool) (string, error)
}
