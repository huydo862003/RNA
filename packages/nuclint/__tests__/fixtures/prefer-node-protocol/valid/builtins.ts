import fs from 'node:fs';
import path from 'node:path';
import { EventEmitter } from 'node:events';
import crypto from 'node:crypto';
import http from 'node:http';
import { readFile } from 'node:fs/promises';

const buffer = Buffer.alloc(10);
const result = crypto.randomBytes(8);
