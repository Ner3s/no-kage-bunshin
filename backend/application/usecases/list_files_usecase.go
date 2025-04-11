package usecases

import (
	"no-kage-bunshin/backend/domain/entities"
	"no-kage-bunshin/backend/domain/repositories"
)

type ListFilesUseCase struct {
	fileRepository repositories.FileRepository
}

func NewListFilesUseCase(fileRepository repositories.FileRepository) *ListFilesUseCase {
	return &ListFilesUseCase{
		fileRepository: fileRepository,
	}
}

func (uc *ListFilesUseCase) Execute(folderPath string) ([]entities.FileInfo, error) {
	return uc.fileRepository.ListFiles(folderPath)
}
