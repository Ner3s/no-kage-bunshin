package services

import (
	"fmt"
	"no-kage-bunshin/backend/utils"
	"os"
)

type CloneResult struct {
	Clones        []DuplicateFile `json:"clones"`
	ExtractedDirs []string        `json:"extractedDirs"`
}

func ListClones(folderPath, tempFolderPrefix string) (*CloneResult, error) {
	tempDir, err := os.MkdirTemp("", tempFolderPrefix)
	if err != nil {
		return nil, fmt.Errorf("erro ao criar pasta temporária: %w", err)
	}
	defer os.RemoveAll(tempDir)

	clones, err := FindDuplicateFiles(folderPath)
	if err != nil {
		return nil, fmt.Errorf("erro ao buscar duplicatas: %w", err)
	}

	extractedDirs, err := utils.ExtractAndCompare([]string{folderPath}, tempDir)
	if err != nil {
		return nil, fmt.Errorf("erro ao extrair arquivos compactados: %w", err)
	}

	return &CloneResult{
		Clones:        clones,
		ExtractedDirs: extractedDirs,
	}, nil
}
