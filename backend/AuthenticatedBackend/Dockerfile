FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar AuthenticatedBackend.jar
ENTRYPOINT ["java","-jar","/AuthenticatedBackend.jar"]
EXPOSE 8000