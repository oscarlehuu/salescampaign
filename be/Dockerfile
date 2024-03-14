FROM python:3.10.8

# create the app user
RUN addgroup --system app && adduser --system --group app

WORKDIR /app/

# Install Poetry
RUN apt-get update && \
    apt-get install curl -y && \
    curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python3 - && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false && \
    # Cleaning cache:
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false && \
    apt-get clean -y && rm -rf /var/lib/apt/lists/*


# Copy poetry.lock* in case it doesn't exist in the repo
COPY ./app/pyproject.toml ./app/poetry.lock* /app/

# Allow installing dev dependencies to run tests
ARG INSTALL_DEV=false

RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --no-dev ; fi"
ENV ENVIRONMENT docker

COPY ./app /app
RUN chmod +x run.sh

ENV PYTHONPATH=/app

# chown all the files to the app user
RUN chown -R app:app $HOME

RUN chown -R app:app /app/app/db/data-seed

# Install project dependencies
RUN poetry add fastapi
# change to the app user
# Switch to a non-root user, which is recommended by Heroku.
USER app

# Run the run script, it will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Uvicorn
CMD poetry run start