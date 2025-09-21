# Script: Check-Bundle.ps1
# Verifica integridad de archivos bundle.js usando MD5

$TargetHash1 = "78e701f42b76ccde3f2678e548886860"
$TargetHash2 = "fbf3fe241abf21b1a732352a037edec0"
$SearchPath = "."

Write-Host "Buscando archivos 'bundle.js' en $SearchPath..."
Write-Host "--------------------------------------------------"

function Get-FileMD5($FilePath) {
    if (Test-Path $FilePath) {
        $md5 = [System.Security.Cryptography.MD5]::Create()
        $stream = [System.IO.File]::OpenRead($FilePath)
        $hashBytes = $md5.ComputeHash($stream)
        $stream.Close()
        return ($hashBytes | ForEach-Object { $_.ToString("x2") }) -join ""
    }
    return $null
}

Get-ChildItem -Path $SearchPath -Recurse -Filter "bundle.js" -ErrorAction SilentlyContinue | ForEach-Object {
    $filePath = $_.FullName
    $currentHash = Get-FileMD5 $filePath

    if ($currentHash -eq $TargetHash1 -or $currentHash -eq $TargetHash2) {
        Write-Host "MATCHED: $filePath"
    } else {
        Write-Host "NOT MATCHED: $filePath"
    }
}

Write-Host "--------------------------------------------------"
Write-Host "Busqueda completa."
