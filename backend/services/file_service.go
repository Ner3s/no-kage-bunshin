package services

import (
	"fmt"
	"os"
	"path/filepath"
)

// ListDirectories lista os diretórios dentro de um caminho especificado
func ListDirectories(path string) ([]string, error) {
	var directories []string

	entries, err := os.ReadDir(path)
	if err != nil {
		return nil, fmt.Errorf("erro ao ler diretório: %v", err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			directories = append(directories, filepath.Join(path, entry.Name()))
		}
	}

	return directories, nil
}
