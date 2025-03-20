set "project=C:\Lev\sensority"

python -m PyInstaller -F --noconfirm --onefile --console --icon "%project%\images\app-logo.png" ^
--add-data "%project%\fonts\*;fonts/" ^
--add-data "%project%\images\*;images/" ^
--add-data "%project%\js\*;js/" ^
--paths="%project%" "%project%\main.py" ^
--hidden-import="scipy.special.cython_special"
PAUSE