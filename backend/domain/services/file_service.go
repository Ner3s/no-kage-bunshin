package services

import (
	"no-kage-bunshin/backend/domain/entities"
)

type FileService interface {
	GetFileHash(filePath string) (string, error)
	FormatSize(size int64) string
	IsCompressed(filePath string) bool
	ExtractCompressedFile(filePath string, destination string) error
	CombineClones(originalClones, extractedClones []entities.DuplicateFile) []entities.DuplicateFile
}
