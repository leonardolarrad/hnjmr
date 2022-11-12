#include <iostream>
#include <Windows.h>

using namespace std;

void HideConsole()
{
    ::FreeConsole();
    ::ShowWindow(::GetConsoleWindow(), SW_HIDE);
}

int main(int argc, char *argv[])
{
    HideConsole();
    return 0;
}