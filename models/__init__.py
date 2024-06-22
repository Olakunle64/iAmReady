#!/usr/bin/python3
"""This module has a script that run when the model package
     is imported.
"""
import os
from models.engine.db import DBStorage


storage = DBStorage()
storage.reload()