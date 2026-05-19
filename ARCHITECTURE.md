# Scalable Architecture Design

This document outlines the architectural evolution of Fitcheck from its current MVP state to a highly scalable production-grade system capable of handling 1M+ users. 

Fitcheck is an **AI Fashion Compatibility & Style Intelligence Platform** designed to help users visualize their aesthetic through "AI Style Previews" and structured algorithmic fashion intelligence.

---

## 1. Current MVP Architecture

The current architecture is optimized for speed of development, low operating costs, and demonstration of full-stack engineering principles. It relies on a monolithic backend and a serverless frontend, keeping infrastructure complexity low while maintaining a clean separation of concerns.

```mermaid
graph TD
    Client[Web Client] --> Frontend
    
    subgraph Vercel
        Frontend[Next.js App]
    end

    subgraph Render/Heroku
        Backend[Express.js Node Backend]
    end
    
    Frontend <-->|REST API| Backend
    Frontend -->|Direct Upload| Cloudinary
    
    Backend -->|Mongoose| MongoDB[(MongoDB Cluster)]
    Backend -->|JWT| Auth((Auth Module))
    Backend -->|Local Logic| Engine((Style Analysis Engine))
```

### MVP Components
*   **Frontend**: Next.js (React) handles UI rendering and client-side routing.
*   **Backend**: Express.js REST API handles business logic and orchestration.
*   **Database**: MongoDB stores User profiles, Generated Images, and Analysis History.
*   **Storage**: Cloudinary acts as a CDN for uploaded images, offloading heavy media storage from the backend.
*   **Auth**: JWT-based stateless authentication.

---

## 2. Future Scalable Production Architecture (1M+ Users)

As the user base scales from 1K to 1M+, the system must evolve to handle increased concurrent traffic, heavy ML inference workloads, and global media delivery. The architecture below outlines the roadmap for high availability and low latency.

```mermaid
graph TD
    Client[Mobile / Web Clients] --> CDN[Cloudflare / AWS CloudFront]
    CDN --> LB[API Gateway / Load Balancer]
    
    LB --> API1[Express API Instance 1]
    LB --> API2[Express API Instance 2]
    LB --> API3[Express API Instance N]
    
    API1 <--> Redis[(Redis Cache)]
    API1 --> Queue[Kafka / BullMQ]
    
    Queue --> MLWorker1[GPU Worker 1]
    Queue --> MLWorker2[GPU Worker N]
    
    MLWorker1 --> S3[(AWS S3 Media Storage)]
    API1 <--> MongoMaster[(MongoDB Primary)]
    
    MongoMaster <--> MongoReplica1[(Mongo Replica Read)]
    MongoMaster <--> MongoReplica2[(Mongo Replica Read)]
    
    API1 --> Monitoring[Datadog / Prometheus]
```

### System Design Thinking for Scale

1.  **Load Balancer & API Gateway**: Distributes incoming API requests across horizontally scaled Express.js backend instances.
2.  **CDN (Content Delivery Network)**: Reduces media delivery latency globally by caching CSS, JS, and image assets at edge nodes closer to users.
3.  **Redis Cache**: Stores frequent, non-mutating requests (e.g., fetching a user's recent style analysis) in memory. **Reasoning**: Redis dramatically reduces repeated style-analysis latency and database read-load.
4.  **Message Queue System (Kafka/BullMQ)**: **Reasoning**: A queue system prevents API request blocking during heavy AI generation. When a user requests an analysis, the API acknowledges the request instantly and pushes a job to the queue. The client can poll or use WebSockets for completion.
5.  **Dedicated ML Inference Layer (GPU Workers)**: **Reasoning**: GPU inference workers are separated from the main API servers to isolate heavy compute workloads. This prevents CPU-bound AI tasks from stalling standard REST API operations like login or fetching history.
6.  **Database Replication & Sharding**: MongoDB Primary handles writes, while Replicas handle read-heavy operations. If data grows massively, sharding by `userId` ensures quick historical lookups.
7.  **Rate Limiting & Monitoring**: Prevents abuse and tracks API health, latency, and worker capacity.

---

## 3. Flows

### Authentication Flow
Stateless authentication ensuring secure session management without tying users to a specific API instance.

```mermaid
sequenceDiagram
    participant User
    participant NextJS
    participant Express
    participant MongoDB
    
    User->>NextJS: Submit Credentials
    NextJS->>Express: POST /api/auth/login
    Express->>MongoDB: Find User & Verify Hash
    MongoDB-->>Express: User Record
    Express-->>NextJS: JWT Access Token
    NextJS->>User: Redirect to Dashboard
```

### Upload & Processing Flow
Optimized media handling where heavy lifting is offloaded to specialized services.

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant Cloudinary
    participant Database
    
    Client->>Express: POST /api/upload (Multipart)
    Express->>Cloudinary: Stream Buffer to CDN
    Cloudinary-->>Express: Secure Image URL
    Express->>Database: Save Record
    Express-->>Client: 200 OK (Image URLs)
```

### Recommendation Flow (Style Intelligence)
Deterministic local logic currently, evolving to ML-driven in production.

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant StyleEngine
    participant Database
    
    Client->>Express: POST /api/tryon/generate (Image URLs)
    Express->>StyleEngine: Analyze Proportions & Colors
    StyleEngine-->>Express: Rich Intelligence JSON (Suitability, Colors, Fits)
    Express->>Database: Persist Output Analysis
    Express-->>Client: Return JSON + Concept Preview
```
