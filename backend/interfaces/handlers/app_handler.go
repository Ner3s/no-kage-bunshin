package handlers

import (
	"context"
	"no-kage-bunshin/backend/application/usecases"
	"no-kage-bunshin/backend/domain/entities"
)

type AppHandler struct {
	ctx                     context.Context
	selectFolderUseCase     *usecases.SelectFolderUseCase
	listFilesUseCase        *usecases.ListFilesUseCase
	findDuplicatesUseCase   *usecases.FindDuplicatesUseCase
	deleteDuplicatesUseCase *usecases.DeleteDuplicatesUseCase
}

func NewAppHandler(
	ctx context.Context,
	selectFolderUseCase *usecases.SelectFolderUseCase,
	listFilesUseCase *usecases.ListFilesUseCase,
	findDuplicatesUseCase *usecases.FindDuplicatesUseCase,
	deleteDuplicatesUseCase *usecases.DeleteDuplicatesUseCase,
) *AppHandler {
	return &AppHandler{
		ctx:                     ctx,
		selectFolderUseCase:     selectFolderUseCase,
		listFilesUseCase:        listFilesUseCase,
		findDuplicatesUseCase:   findDuplicatesUseCase,
		deleteDuplicatesUseCase: deleteDuplicatesUseCase,
	}
}

func (h *AppHandler) SelectFolder() (string, error) {
	return h.selectFolderUseCase.Execute()
}

func (h *AppHandler) ListFiles(folderPath string) ([]entities.FileInfo, error) {
	return h.listFilesUseCase.Execute(folderPath)
}

func (h *AppHandler) ListClones(folderPath string) (*usecases.CloneResult, error) {
	return h.findDuplicatesUseCase.Execute(folderPath, "tempNoKageBunshin")
}

func (h *AppHandler) DeleteDuplicatedFiles(filesPaths []string, isPermanent bool) (string, error) {
	return h.deleteDuplicatesUseCase.Execute(filesPaths, isPermanent)
}
