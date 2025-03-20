import os

import sys
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtWebEngineWidgets import QWebEngineView
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import Qt, QCoreApplication, QVariant, QUrl, QObject, pyqtSlot, QFile, QTextStream, pyqtSignal
from PyQt5.QtWebChannel import QWebChannel
import tkinter as tk

os.environ["QTWEBENGINE_CHROMIUM_FLAGS"] = "--enable-gpu --enable-threaded-compositing"
QCoreApplication.setAttribute(Qt.AA_UseOpenGLES)
BASE_DIR = os.path.dirname(__file__)
    

class PythonBridge(QObject):
    sendJsCommand = pyqtSignal(str)

    @pyqtSlot(result=str)
    def get_message(self):
        return "Hello from Python!"

    @pyqtSlot(str)
    def send_message(self, message):
        print("Message from JavaScript:", message)
class HTMLViewer(QMainWindow):

    def __init__(self):
        super().__init__()
        self.setWindowTitle("Sensority")
        self.setGeometry(100, 100, 1280, 720)

        # Initialize QWebEngineView to display HTML content
        self.browser = QWebEngineView()

        # Load HTML content from a separate file
        html_path = os.path.join(BASE_DIR, 'js', 'index.html')
        self.browser.setUrl(QUrl.fromLocalFile(html_path))
        icon_path = os.path.join(BASE_DIR, 'images', 'app-logo.png')
        self.setWindowIcon(QIcon(icon_path)) 

        # Set up QWebChannel to connect JavaScript with Python
        self.channel = QWebChannel()
        self.python_bridge = PythonBridge()
        self.channel.registerObject("bridge", self.python_bridge)
        self.browser.page().setWebChannel(self.channel)

        # Set the browser widget as the central widget of the window
        self.setCentralWidget(self.browser)

# Initialize the application and main window
root = tk.Tk()
root.withdraw()
app = QApplication(sys.argv)
window = HTMLViewer()
window.show()
sys.exit(app.exec_())    
