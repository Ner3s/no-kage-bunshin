package utils

import (
	"path/filepath"
	"strings"
)

func IsSimilarName(name1, name2 string) bool {
	base1 := strings.TrimSuffix(name1, filepath.Ext(name1))
	base2 := strings.TrimSuffix(name2, filepath.Ext(name2))

	return strings.EqualFold(strings.ToLower(base1), strings.ToLower(base2))
}
