# -*- mode: python ; coding: utf-8 -*-


a = Analysis(
    ['C:\\Lev\\sensority\\main.py'],
    pathex=['C:\\Lev\\sensority'],
    binaries=[],
    datas=[('C:\\Lev\\sensority\\fonts\\*', 'fonts/'), ('C:\\Lev\\sensority\\images\\*', 'images/'), ('C:\\Lev\\sensority\\js\\*', 'js/')],
    hiddenimports=['scipy.special.cython_special'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon=['C:\\Lev\\sensority\\images\\app-logo.png'],
)
