#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int target;

void winner()
{
    if(target != 5)
    {
        printf("Success!!\n");
    }
    exit(1);
}

void vuln()
{
    char buffer[64];

    target = 5;

    gets(buffer);

    printf( buffer );
}

int main(int argc, char **argv)
{
    vuln();
}