[string] $Basedir = $PSScriptRoot
[string] $Regex = "([a-zA-Z]:((\\|\/)|\/)([\S\s]*))(\\|\/)RCSOverlay"
[string] $RCSOverlayRoot = Resolve-Path $PSScriptRoot\\..

[string] $XsplitBpresDirectory = Resolve-Path $RCSOverlayRoot\\configs\\XSplit
[string] $ObsSceneProfileDirectory = Resolve-Path $RCSOverlayRoot\\configs\\OBS
[string] $BackupsDirectory = "$RCSOverlayRoot\\configs\\Backups"

$date = Get-Date -UFormat "%Y%m%d_%H%M%S"

if(! $(Test-Path $BackupsDirectory)){
    echo "Backups directory does not exist. Creating..."
    New-Item -ItemType "directory" -Path $BackupsDirectory

    echo "Done."
    echo "----------------"
}

function RewriteFilesInDir{
    $dir = $args[0]
    $separator = $args[1]
    if($separator -eq $null){
        $separator = "\\"
    }

    echo $dir
    $files = Get-ChildItem $dir
    foreach($file in $files){
        $filepath = Resolve-Path $dir\\$file
        $content = Get-Content $filepath
        $updatedContent = $content -replace $Regex,$RCSOverlayRoot

        if($separator -ne "\\"){
            $updatedContent = $updatedContent -replace "\\",$separator
        }

        $backupFilepath = "$BackupsDirectory\\$file.backup.$date"
        echo "Backing up file: $file ($backupFilepath)"
        Copy-Item $filepath $backupFilepath

        echo "Rewriting $file with '$RCSOverlayRoot'"
        echo $updatedContent > $filepath
    }
}

function RewriteXsplitBpresFiles{
    RewriteFilesInDir $XsplitBpresDirectory "\\"
}

function RewriteObsSceneProfileFiles{
    RewriteFilesInDir $ObsSceneProfileDirectory "/"
}

echo "Overwriting XSplit BPres files for your computer..."
RewriteXsplitBpresFiles

echo "Done."
echo "----------------"

echo "Overwriting OBS Scene Profile files for your computer..."
RewriteObsSceneProfileFiles

echo "Done."