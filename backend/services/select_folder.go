package services

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func SelectFolder(ctx context.Context) (string, error) {
	folderPath, err := runtime.OpenDirectoryDialog(ctx, runtime.OpenDialogOptions{
		Title: "Select a folder",
	})
	if err != nil {
		return "", err
	}
	return folderPath, nil
}
