import os
from pathlib import Path
from flask import Flask, render_template, request
from flask import send_file
from webpack_boilerplate.config import setup_jinja2_ext

BASE_DIR = Path(__file__).parent
app = Flask(__name__, static_folder="frontend/build", static_url_path="/static/")
app.config.update({
    'WEBPACK_LOADER': {
        'MANIFEST_FILE': BASE_DIR / "frontend/build/manifest.json",
    }
})
setup_jinja2_ext(app)

@app.cli.command("webpack_init")
def webpack_init():
    from cookiecutter.main import cookiecutter
    import webpack_boilerplate
    pkg_path = os.path.dirname(webpack_boilerplate.__file__)
    cookiecutter(pkg_path, directory="frontend_template")

@app.route("/")
def home():
    return render_template('home.html')

@app.route('/sw.js')
def service_worker():
    return send_file('frontend/src/sw.js', mimetype='application/javascript')


import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
#define actuators GPIOs
fan = 21
ledYlw = 24
ledGrn = 17
#initialize GPIO status variables
fanSts = 0
ledYlwSts = 0
ledGrnSts = 0
# Define led pins as output
GPIO.setup(fan, GPIO.OUT)   
GPIO.setup(ledYlw, GPIO.OUT) 
GPIO.setup(ledGrn, GPIO.OUT) 
# turn leds OFF 
GPIO.output(fan, GPIO.LOW)
GPIO.output(ledYlw, GPIO.LOW)
GPIO.output(ledGrn, GPIO.LOW)
	
@app.route('/devices')
def devices():
    # Read Sensors Status
    fanSts = GPIO.input(fan)
    if fanSts == 0:
        fanSts = "Off"
    else:
        fanSts = "On"
    templateData = {'title' : 'Lamp Status:', 'fan'  : fanSts}
    return render_template('devices.html', **templateData)

@app.route("/devices/<deviceName>/<action>")
def action(deviceName, action):
	if deviceName == 'fan':
		actuator = fan
	if deviceName == 'ledYlw':
		actuator = ledYlw
	if deviceName == 'ledGrn':
		actuator = ledGrn
	if action == "on":
		GPIO.output(actuator, GPIO.HIGH)
	if action == "off":
		GPIO.output(actuator, GPIO.LOW)
		     
	ledRedSts = GPIO.input(fan)
	ledYlwSts = GPIO.input(ledYlw)
	ledGrnSts = GPIO.input(ledGrn)
   
	templateData = {
        'fan'  : fanSts,
        'ledYlw'  : ledYlwSts,
        'ledGrn'  : ledGrnSts,
	}
	return render_template('devices.html', **templateData)


