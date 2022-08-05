#!/bin/bash
#SBATCH -J test
#SBATCH -o %x.o%j
#SBATCH -e %x.e%j
#SBATCH --time 12:00:00

echo "Running plot script on a single CPU core"

sleep 3000

date 