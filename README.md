# Auto Caption API
API for automatic video subtitling that returns a final video with embedded captions.
## Overview
Given a video file, this API automatically extracts and transcribes the speech from the audio using Whisper API (base model), generates .srt file, embeds it into the original video and returns the result. 
A structured processing pipeline built with NestJS handles the entire workflow. All files created and stored locally are cleaned up after processing, whether successful or not.

#### Technologies
- TypeScript
- Docker
- Nestjs
- FFmpeg
- Whisper

#### Try it out
[Here](http://example.com) you can try an available online version.

#### How to run: 
1: Clone the repo  
`git clone https://github.com/devistto/AutoCaption-api.git`

2: Run with Docker
`docker-compose up --build`

3: Open Swagger documentation [http://localhost:8000/doc](http://localhost:8000/doc)

#### Improvements
A queue system, multiple simultaneous uploads and cloud storage integration could be implemented. But for now it's out of question.