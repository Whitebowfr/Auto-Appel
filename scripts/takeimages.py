import cv2
import sys
import os

if len(sys.argv) < 2 :
    raise ValueError('The class ID is missing. Please launch the script with the ID following the path (example: python takeimages.py 5)')

# Creates the folder if it doesn't exist yet
if not os.path.exists(f'./database/temp_photos/{sys.argv[1]}'):
    os.makedirs(f'./photos/{sys.argv[1]}')

cam = cv2.VideoCapture(0)

cv2.namedWindow('test')

# Init the counter at the last element of the folder to prevent overwriting
img_counter = len(os.listdir(f'./database/temp_photos/{sys.argv[1]}'))

while True:
    ret, frame = cam.read()
    if not ret:
        print('failed to grab frame')
        break

    cv2.imshow('test', frame)

    k  = cv2.waitKey(1)

    if k%256 == 27:
        print('escape hit, closing the app')
        break

    elif k%256  == 32:
        cv2.imwrite(f'./database/ref_photos/{sys.argv[1]}/frame_{img_counter}.png', frame)
        print('screenshot taken')
        img_counter += 1

cam.release()
cam.destroyAllWindows()