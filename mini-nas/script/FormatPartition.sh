#!/bin/bash
read disk
(
printf "d\n" 
printf "w\n"   
) | sudo fdisk $1