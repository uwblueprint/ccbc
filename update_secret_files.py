import sys
import json

# Open secret.config file
configFileNotFound = False
try:
	configFile = open('secret.config')
except Exception as e:
	print("File secret.config could not be opened in current directory.")
	print(e)
	configFileNotFound = True
	# Script will exit after checking if the Vault request is valid

# Decode json result
try:
	rawInput = ''.join(sys.stdin.readlines())
	decodedJson = json.loads(rawInput)
except Exception as e:
	print("Unable to retrieve secrets from Vault and obtain valid json result.")
	print("Please ensure you are authenticated and have supplied the correct path argument.")
	exit()

# Extract the data field containting the secrets
if "data" in decodedJson and "data" in decodedJson["data"]:
	data = decodedJson["data"]["data"]
else:
	print("Unable to access the field data:{data:{}} from result which should contain the secrets.")
	print("Please ensure you are authenticated and have supplied the correct path argument.")
	exit()

# Even if the config file is not found, it is useful to still indicate if the Vault request has any problems before exiting
if configFileNotFound:
	exit()

# Read all the secret file locations from secret.config
locations = {}
for line in configFile:
	key, val = line.rstrip().partition('=')[::2]
	if key in locations:
		print("Key <{keyName}> appeared more than once on configuration file. Ignoring second instance of the key.".format(keyName=key))
	else:
		locations[key] = val
configFile.close()

# Write values to the secret file corresponding to their keys
for key in data:
	if key in locations:
		try:
			f = open(locations[key], 'w')
			f.write(data[key])
			f.close()
		except Exception as e:
			print("Could not write the values for key <{keyName}> to location <{locName}>".format(keyName=key, locName=locations[key]))
			print(e)
	else:
		print("File location for key <{keyName}> was not found.".format(keyName=key))