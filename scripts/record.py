from cgitb import small
from re import I
import cv2
import face_recognition
from PIL import *
import sys
import time
import os

cap = cv2.VideoCapture(0)

if len(sys.argv) < 2 :
    raise ValueError('The class ID is missing. Please launch the script with the ID following the path (example: python record.py 5)')

frames_per_second = 5
prev_time = 0

if not os.path.exists(f'./database/temp_photos/{sys.argv[1]}'):
    os.makedirs(f'./database/temp_photos/{sys.argv[1]}')

# Init the index to a new position to prevent overwriting previous recordings
imageIndex = len(os.listdir(f'./database/temp_photos/{sys.argv[1]}'))

while True:
    sys.stdout.flush()

    ret, frame = cap.read()

    # We're using this method instead of time.sleep() to prevent buffer accumulation, which would cause lag.
    delta_t = time.time() - prev_time

    if delta_t > 1./frames_per_second :
        prev_time = time.time()
        sys.stdout.flush()

        locations = face_recognition.face_locations(frame)
        
        for (top, right, bottom, left) in locations:
            print((top, right, bottom, left))
            sys.stdout.flush()

            croppedFrame = frame[top:bottom, left:right]
            cv2.imwrite(f'./database/temp_photos/{sys.argv[1]}/{imageIndex}.png', croppedFrame)
            imageIndex += 1