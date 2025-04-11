package main

import (
	"context"
	"no-kage-bunshin/backend/application/usecases"
	"no-kage-bunshin/backend/domain/entities"
	"no-kage-bunshin/backend/infrastructure/persistence"
	"no-kage-bunshin/backend/interfaces/handlers"
)

// App struct
type App struct {
	ctx        context.Context
	appHandler *handlers.AppHandler
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// Initialize services
	fileService := persistence.NewFileService()
	duplicateDetectorService := persistence.NewDuplicateDetectorService(fileService)

	// Initialize repositories
	fileRepository := persistence.NewFileRepository(fileService, duplicateDetectorService)

	// Initialize use cases
	selectFolderUseCase := usecases.NewSelectFolderUseCase(ctx)
	listFilesUseCase := usecases.NewListFilesUseCase(fileRepository)
	findDuplicatesUseCase := usecases.NewFindDuplicatesUseCase(fileRepository, fileService, duplicateDetectorService)
	deleteDuplicatesUseCase := usecases.NewDeleteDuplicatesUseCase(fileRepository)

	// Initialize handler
	a.appHandler = handlers.NewAppHandler(
		ctx,
		selectFolderUseCase,
		listFilesUseCase,
		findDuplicatesUseCase,
		deleteDuplicatesUseCase,
	)
}

func (a *App) SelectFolder() (string, error) {
	return a.appHandler.SelectFolder()
}

func (a *App) ListFiles(folderPath string) ([]entities.FileInfo, error) {
	return a.appHandler.ListFiles(folderPath)
}

func (a *App) ListClones(folderPath string) (*usecases.CloneResult, error) {
	return a.appHandler.ListClones(folderPath)
}

func (a *App) DeleteDuplicatedFiles(filesPaths []string, isPermanent bool) (string, error) {
	return a.appHandler.DeleteDuplicatedFiles(filesPaths, isPermanent)
}
