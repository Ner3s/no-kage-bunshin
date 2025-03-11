package main

import (
	"context"
	"no-kage-bunshin/backend/services"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SelectFolder() (string, error) {
  return services.SelectFolder(a.ctx)
}

func (a *App) ListFiles(folderPath string) ([]services.FileInfo, error){
  return services.ListFiles(folderPath)
}
