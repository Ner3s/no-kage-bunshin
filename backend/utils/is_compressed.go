package utils

import (
	"bytes"
	"os"
)

func IsCompressed(filePath string) bool {
	signatures := [][]byte{
		{0x50, 0x4B, 0x03, 0x04},             // ZIP
		{0x1F, 0x8B},                         // GZIP
		{0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C}, // 7z
	}

	file, err := os.Open(filePath)
	if err != nil {
		return false
	}
	defer file.Close()

	buf := make([]byte, 6)
	_, err = file.Read(buf)
	if err != nil {
		return false
	}

	for _, sig := range signatures {
		if bytes.HasPrefix(buf, sig) {
			return true
		}
	}
	return false
}
