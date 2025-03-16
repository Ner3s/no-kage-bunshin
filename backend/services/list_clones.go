package services

import (
	"fmt"
	"no-kage-bunshin/backend/utils"
	"os"
)

type CloneResult struct {
	Clones        []DuplicateFile `json:"clones"`
	ExtractedDirs []string        `json:"extractedDirs"`
	AllFiles      []FileInfo      `json:"allFiles"`
}

func ListClones(folderPath, tempFolderPrefix string) (*CloneResult, error) {
	tempDir, err := os.MkdirTemp("", tempFolderPrefix)
	if err != nil {
		return nil, fmt.Errorf("erro ao criar pasta temporária: %w", err)
	}
	defer os.RemoveAll(tempDir)

	clones, allFiles, err := FindDuplicateFiles(folderPath)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar duplicatas: %w", err)
	}

	extractedDirs, err := []string{}, nil

	for _, filesForCheck := range allFiles {
		extractedDirs, err = utils.ExtractAndCompare([]string{filesForCheck.Path}, tempDir)
	}

	if err != nil {
		return nil, fmt.Errorf("erro ao extrair arquivos compactados: %w", err)
	}

	return &CloneResult{
		Clones:        clones,
		ExtractedDirs: extractedDirs,
		AllFiles:      allFiles,
	}, nil
}
