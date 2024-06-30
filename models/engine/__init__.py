#!/usr/bin/python3
"""This module contains a codes that run when the package
     is imported.
"""
import os

from models.engine.db import DBStorage
storage = DBStorage()
storage.reload()