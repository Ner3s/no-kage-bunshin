package usecases

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type SelectFolderUseCase struct {
	ctx context.Context
}

func NewSelectFolderUseCase(ctx context.Context) *SelectFolderUseCase {
	return &SelectFolderUseCase{
		ctx: ctx,
	}
}

func (uc *SelectFolderUseCase) Execute() (string, error) {
	folderPath, err := runtime.OpenDirectoryDialog(uc.ctx, runtime.OpenDialogOptions{
		Title: "Select a folder",
	})
	if err != nil {
		return "", err
	}
	return folderPath, nil
}
