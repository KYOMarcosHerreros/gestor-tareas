# Usamos la imagen oficial de .NET para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

#Copiamos los archivos del proyecto y restauramos dependencias
COPY *.csproj ./
RUN dotnet restore

#Copiamos el resto del código y publicamos
COPY . ./
RUN dotnet publish -c Release -o out

# Creamos la imagen final más ligera para ejecutar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Obligamos a la API a escuchar en el puerto 8080
ENV ASPNETCORE_URLS=http://+:8080

#Exponemos el puerto y lanzamos la API
EXPOSE 8080
ENTRYPOINT ["dotnet", "TareasAPI.dll"]