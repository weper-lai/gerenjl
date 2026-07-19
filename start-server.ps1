$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8888/')
$listener.Start()
Write-Host 'Server started at http://localhost:8888/'

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $url = $request.Url.LocalPath
    if ($url -eq '/') { $url = '/index.html' }
    
    $filePath = Join-Path (Get-Location) $url.TrimStart('/')
    
    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $content.Length
        
        $ext = [System.IO.Path]::GetExtension($filePath)
        $response.ContentType = switch ($ext) {
            '.html' { 'text/html' }
            '.css' { 'text/css' }
            '.js' { 'application/javascript' }
            '.png' { 'image/png' }
            '.jpg' { 'image/jpeg' }
            default { 'application/octet-stream' }
        }
        
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
    }
    
    $response.Close()
}