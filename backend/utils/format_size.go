package utils

import (
	"fmt"
)

func FormatSize(size int64) string {
	const unit = 1024
	units := []string{"B", "KB", "MB", "GB", "TB", "PB", "EB"}

	if size < unit {
		return fmt.Sprintf("%d B", size)
	}

	div, exp := int64(1), 0
	for size/div >= unit && exp < len(units)-1 {
		div *= unit
		exp++
	}

	return fmt.Sprintf("%.2f %s", float64(size)/float64(div), units[exp])
}
