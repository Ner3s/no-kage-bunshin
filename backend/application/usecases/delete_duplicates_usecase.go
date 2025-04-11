package usecases

import (
	"no-kage-bunshin/backend/domain/repositories"
)

type DeleteDuplicatesUseCase struct {
	fileRepository repositories.FileRepository
}

func NewDeleteDuplicatesUseCase(fileRepository repositories.FileRepository) *DeleteDuplicatesUseCase {
	return &DeleteDuplicatesUseCase{
		fileRepository: fileRepository,
	}
}

func (uc *DeleteDuplicatesUseCase) Execute(filesPaths []string, isPermanent bool) (string, error) {
	return uc.fileRepository.DeleteFiles(filesPaths, isPermanent)
}
