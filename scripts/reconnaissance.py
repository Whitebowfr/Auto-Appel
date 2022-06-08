import face_recognition
import cv2
from PIL import *
import numpy as np
import os
import sys

video_capture = cv2.VideoCapture(0)

if len(sys.argv) < 2 :
    raise ValueError('The class ID is missing. Please launch the script with the ID following the path (example: python reconnaissance.py 5)')

imageNames = [name for name in os.listdir(f'./database/ref_photos/{sys.argv[1]}')]

# Create arrays of known face encodings and their names
known_face_encodings = [face_recognition.face_encodings(face_recognition.load_image_file(f'./database/ref_photos/{sys.argv[1]}/{name}'))[0] for name in imageNames]

known_face_names = [name.replace('.png', '') for name in imageNames]

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

imagesNamesToProcess = [name for name in os.listdir(f'./database/temp_photos/{sys.argv[1]}')]

for imageNameToProcess in imagesNamesToProcess :
    image = Image.open(f'./database/temp_photos/{sys.argv[1]}/{imageNameToProcess}')
    frame = np.asarray(image)

    # Resize the image to optimize the process a bit
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    rgb_small_frame = small_frame[:, :, ::-1]

    face_locations = face_recognition.face_locations(rgb_small_frame)
    face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

    face_names = []
    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = ""
            
        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index]:
            name = known_face_names[best_match_index]

        face_names.append(name)    

    if len(face_names) > 0 and face_names[0] != "" :
        print(face_names[0])
        sys.stdout.flush()

    # Deletes the file
    os.remove(f'./database/temp_photos/{sys.argv[1]}/{imageNameToProcess}')
