import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from textgenrnn import textgenrnn
textgen = textgenrnn(weights_path='model/lstm-allname_weights.hdf5',
                     vocab_path='model/lstm-allname_vocab.json',
                     config_path='model/lstm-allname_config.json'
                     )

app = FastAPI()
app.mount("/home", StaticFiles(directory="static", html=True), name="root")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def index():
    response = RedirectResponse(url='/home')
    return response


@app.get('/generate')
def generateNames(prefix: str = '', n: int = 1, temperature: float = 1):
    names = textgen.generate(
        n=n, return_as_list=True, prefix=prefix, progress=False, temperature=[temperature])
    return {
        'names': set(names),
    }


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)

#run in terminal
# uvicorn app:app --reload
