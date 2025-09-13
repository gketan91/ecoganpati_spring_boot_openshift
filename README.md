# EcoGanpati Store - Spring Boot Application

A professional e-commerce Spring Boot application for eco-friendly Ganpati idols made from grass-based natural plaster.

## 🚀 Features

- ☕ **Spring Boot 3.2** with Java 17
- 🌱 **Professional green theme** (no yellow colors)
- 🛒 **Shopping cart functionality** with REST API
- 📱 **Responsive design** optimized for all devices
- 🐳 **Docker containerization** with multi-stage builds
- ☸️ **OpenShift deployment** ready with YAML configs
- 🔧 **Production-ready** with health checks and monitoring
- ⚡ **Lightweight** - optimized for minimal resource usage

## 🏗️ Architecture

```
├── Java Spring Boot Backend
│   ├── REST API (/api/products, /api/cart)
│   ├── Thymeleaf Templates
│   └── Static Resources (CSS, JS, Images)
├── Docker Multi-Stage Build
└── OpenShift Deployment (K8s)
```

## 🚀 Quick Start

### Local Development

```bash
# Using Maven
./mvnw spring-boot:run

# Or with Java directly
./mvnw clean package
java -jar target/store-1.0.0.jar
```

### Docker Build & Run

```bash
# Build Docker image
docker build -t ecoganpati-store:latest .

# Run container
docker run -p 8080:8080 ecoganpati-store:latest
```

### OpenShift Deployment

```bash
# Make sure you're logged into OpenShift
oc login

# Deploy using the script
./deploy-openshift.sh

# Or manually apply YAML files
oc apply -f openshift/deployment.yaml
oc apply -f openshift/service.yaml
oc apply -f openshift/route.yaml
```

## 🌐 Endpoints

- **Application**: `http://localhost:8080`
- **Health Check**: `http://localhost:8080/actuator/health`
- **API Products**: `http://localhost:8080/api/products`
- **API Cart**: `http://localhost:8080/api/cart` (POST)

## 🐳 Docker Configuration

The application uses a **multi-stage Docker build**:

1. **Build Stage**: Maven + OpenJDK 17 for compilation
2. **Runtime Stage**: OpenJDK 17 JRE-slim for minimal footprint

**Security Features**:
- Non-root user execution
- Read-only root filesystem  
- Minimal capabilities
- Health checks included

## ☸️ OpenShift Deployment

### Files Included:

- `deployment.yaml` - Application deployment with 2 replicas
- `service.yaml` - ClusterIP service on port 8080
- `route.yaml` - HTTPS route with edge termination
- `buildconfig.yaml` - OpenShift build configuration

### Resource Limits:

- **Memory**: 256Mi request, 512Mi limit
- **CPU**: 100m request, 500m limit
- **Replicas**: 2 for high availability

### Security:

- Security context with non-root user
- Read-only filesystem
- Dropped capabilities
- Network policies ready

## 🔧 Configuration

### Application Properties

Key configurations in `application.yml`:

```yaml
server:
  port: 8080
spring:
  application:
    name: ecoganpati-store
management:
  endpoints:
    web:
      exposure:
        include: health,info
```

### Environment Variables

- `SPRING_PROFILES_ACTIVE` - Set to 'production' for prod
- `SERVER_PORT` - Application port (default: 8080)

## 🌟 Product Features

### Grass-Based Ganpati Idols:

1. **Classic Seated Ganpati** - Traditional meditation pose
2. **Majestic Standing Ganpati** - Elegant standing design
3. **Divine Dancing Ganpati** - Dynamic celebration pose
4. **Lotus Bliss Ganpati** - Compact lotus-base design

### Eco-Friendly Benefits:

- 🌿 100% biodegradable materials
- ♻️ Made from natural grass fibers
- 🌍 Sustainable manufacturing process
- 🎨 Handcrafted by artisans

## 📊 Monitoring

### Health Checks:

- **Liveness Probe**: `/actuator/health` (30s initial delay)
- **Readiness Probe**: `/actuator/health` (10s initial delay)
- **Docker Health Check**: Built-in with 30s intervals

### Metrics:

- Spring Boot Actuator endpoints
- Application performance monitoring
- Custom business metrics ready

## 🔐 Security

### Application Security:

- HTTPS enforcement on OpenShift routes
- Security headers configured
- CORS policy implemented
- Input validation on all endpoints

### Container Security:

- Non-root user execution (UID 1000)
- Minimal attack surface
- Read-only root filesystem
- Security scanning ready

## 🚀 Performance

### Optimizations:

- **Lightweight JRE**: OpenJDK 17 JRE-slim
- **Multi-stage build**: Reduced image size
- **Resource limits**: Optimal memory/CPU usage
- **Static resource caching**: Improved load times

### Scaling:

- **Horizontal**: Multiple replicas supported
- **Auto-scaling**: HPA ready configuration
- **Load balancing**: Service mesh compatible

## 🛠️ Development

### Prerequisites:

- Java 17+
- Maven 3.6+
- Docker (optional)
- OpenShift CLI (for deployment)

### Building:

```bash
# Clean and compile
./mvnw clean compile

# Run tests
./mvnw test

# Package JAR
./mvnw clean package

# Skip tests for faster builds
./mvnw clean package -DskipTests
```

### IDE Support:

- IntelliJ IDEA
- Eclipse STS
- VS Code with Java extensions

## 📦 Production Deployment

### Checklist:

- [ ] Set `SPRING_PROFILES_ACTIVE=production`
- [ ] Configure external monitoring
- [ ] Set up log aggregation
- [ ] Configure SSL certificates
- [ ] Set resource limits
- [ ] Enable security scanning
- [ ] Configure backup procedures

## 🤝 Contributing

This is a demonstration application showcasing Spring Boot deployment to OpenShift with eco-friendly e-commerce functionality.

## 📄 License

MIT License - Feel free to use and modify for your projects.
