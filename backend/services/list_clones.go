package services

import (
	"fmt"
	"no-kage-bunshin/backend/models"
	"os"
)

type CloneResult struct {
	Clones        []models.DuplicateFile `json:"clones"`
	ExtractedDirs []string               `json:"extractedDirs"`
	AllFiles      []models.FileInfo      `json:"allFiles"`
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

	// extractedDirs, err := utils.ExtractAndCompare(allFiles, tempDir)
	// if err != nil {
	// 	return nil, fmt.Errorf("erro ao extrair arquivos compactados: %w", err)
	// }

	// TODO - Improve this part
	/**
	 * @TODO - Improve this part
	 * - [x] Extracted files are being compared with the original files
	 * - [] Create a relation between the zip file and the extracted file, because need to delete the zip file and not the extracted file
	 */
	// extractedFilesClones, _, err := FindDuplicateFiles(tempDir)
	// if err != nil {
	// 	return nil, fmt.Errorf("erro ao buscar duplicatas dos arquivos extraídos: %w", err)
	// }

	// verifica se existem clones na pasta temporaria e compara com os clones existentes.
	// clones = utils.combineClones(clones, extractedFilesClones)

	return &CloneResult{
		Clones:        clones,
		ExtractedDirs: nil,
		AllFiles:      allFiles,
	}, nil
}
