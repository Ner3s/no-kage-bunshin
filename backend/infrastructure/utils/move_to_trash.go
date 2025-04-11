package utils

import (
	"fmt"
	"os"
	"os/exec"
	"runtime"
)

func MoveToTrash(filePath string) error {
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return fmt.Errorf("file does not exist: %s", filePath)
	}

	switch runtime.GOOS {
	case "darwin":
		return exec.Command("osascript", "-e", `tell application "Finder" to delete POSIX file "`+filePath+`"`).Run()

	case "linux":
		if gioErr := exec.Command("gio", "trash", filePath).Run(); gioErr == nil {
			return nil
		}
		if trashErr := exec.Command("trash", filePath).Run(); trashErr == nil {
			return nil
		}
		return os.Remove(filePath)

	case "windows":
		script := `Add-Type -AssemblyName Microsoft.VisualBasic
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile('` + filePath + `',
'OnlyErrorDialogs',
'SendToRecycleBin')`
		cmd := exec.Command("powershell", "-Command", script)
		return cmd.Run()

	default:
		return os.Remove(filePath)
	}
}
