#include <Windows.h>

int main(int argc, char* argv[])
{
    ShellExecute(NULL, L"open", L"boostrap.exe", NULL, NULL, SW_HIDE);
}