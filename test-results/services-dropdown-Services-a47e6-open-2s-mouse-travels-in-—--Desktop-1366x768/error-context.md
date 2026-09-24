# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: services-dropdown.spec.ts >> Services dropdown (click-only) >> 1 · click opens within 300ms, stays open 2s, mouse travels in — /
- Location: tests\e2e\services-dropdown.spec.ts:45:9

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#services-dropdown-trigger')
    - locator resolved to <button type="button" aria-haspopup="true" aria-expanded="false" id="services-dropdown-trigger" aria-controls="services-dropdown-panel" class="px-4 lg:px-5 py-2 rounded-full text-[16px] font-medium transition-colors duration-200 flex items-center gap-1.5 cursor-pointer text-[#14163F] hover:text-[#1B3FD1] hover:bg-slate-50">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img sizes="420px" loading="lazy" decoding="async" data-nimg="fill" src="/_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=3840&q=75" alt="Bank Reconciliation Automation via MT940 Electronic Statements" class="object-cover transition-transform duration-500 hover:scale-105" srcset="/_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=16&q=75 16w, /_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=32&q=75 32w, /_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=48&q=75 48w, /_next/image?url=%2Fimages%2…/> from <main id="main-content" class="flex-grow">…</main> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <img sizes="420px" loading="lazy" decoding="async" data-nimg="fill" src="/_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=3840&q=75" alt="Bank Reconciliation Automation via MT940 Electronic Statements" class="object-cover transition-transform duration-500 hover:scale-105" srcset="/_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=16&q=75 16w, /_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=32&q=75 32w, /_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=48&q=75 48w, /_next/image?url=%2Fimages%2…/> from <main id="main-content" class="flex-grow">…</main> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    104 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <img sizes="420px" loading="lazy" decoding="async" data-nimg="fill" src="/_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=3840&q=75" alt="Bank Reconciliation Automation via MT940 Electronic Statements" class="object-cover transition-transform duration-500 hover:scale-105" srcset="/_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=16&q=75 16w, /_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=32&q=75 32w, /_next/image?url=%2Fimages%2Fcase-bank-recon.jpg&w=48&q=75 48w, /_next/image?url=%2Fimages%2…/> from <main id="main-content" class="flex-grow">…</main> subtree intercepts pointer events
      - retrying click action
        - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - button "Open navigation menu" [ref=e7]
        - link "XpmindGlobal Home" [ref=e8] [cursor=pointer]:
          - /url: /
          - img "XpmindGlobal" [ref=e9]
      - navigation "Primary Navigation" [ref=e10]:
        - generic [ref=e11]:
          - link "About" [ref=e12] [cursor=pointer]:
            - /url: /about
          - button "Services" [ref=e14]
          - link "Projects" [ref=e17] [cursor=pointer]:
            - /url: /projects
          - link "Training" [ref=e18] [cursor=pointer]:
            - /url: /training
          - link "Contact" [ref=e19] [cursor=pointer]:
            - /url: /contact
      - button "Get in TouchContact" [ref=e22]
  - main [ref=e23]:
    - generic [ref=e24]:
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30]: Certified S/4HANA Specialists · 20+ Years of SAP® Excellence
          - heading "Enterprise SAP® Solutions That Drive Real Growth." [level=1] [ref=e31]
          - paragraph [ref=e32]: XpmindGlobal delivers end-to-end SAP® consulting, S/4HANA migration, Cloud BTP, Analytics, GRC, and Application Management Services. Founded by senior Chartered Accountants and SAP® leaders in Greater Noida, India.
        - generic [ref=e34]:
          - generic [ref=e36]:
            - textbox "Describe your SAP challenge for assessment" [ref=e38]:
              - /placeholder: Tell us about your SAP® challenge…
            - button "Get Free Assessment" [ref=e39]
          - generic [ref=e42]:
            - text: "Popular:"
            - generic [ref=e43]:
              - button "ECC → S/4HANA migration" [ref=e44]
              - button "AMS support" [ref=e45]
              - button "SAP® GRC & compliance" [ref=e46]
              - button "Analytics & reporting" [ref=e47]
              - button "SAP® Cloud & BTP" [ref=e48]
      - generic [ref=e49]:
        - generic [ref=e51]:
          - generic [ref=e52]:
            - generic [ref=e53]:
              - generic [ref=e54]: XPMIND // SAP® S/4HANA Executive Telemetry
              - generic [ref=e55]: HANA In-Memory · Live
            - generic [ref=e56]:
              - generic [ref=e57]:
                - generic [ref=e58]: Universal Journal (ACDOCA)
                - generic [ref=e59]: 2,840,120
                - generic [ref=e60]: Real-time postings synchronized
              - generic [ref=e61]:
                - generic [ref=e62]: AMS Response Time
                - generic [ref=e63]: 99.98%
                - generic [ref=e64]: Priority 1 SLA adhered
              - generic [ref=e65]:
                - generic [ref=e66]: Automated Clearing
                - generic [ref=e67]: 94.6%
                - generic [ref=e68]: MT940 statements auto-cleared
            - generic [ref=e69]:
              - generic [ref=e70]:
                - generic [ref=e71]: S/4HANA System Conversion Velocity16-Week Trajectory
                - img [ref=e73]:
                  - generic [ref=e77]: Week 09
              - generic [ref=e78]:
                - text: Module Health Index
                - generic [ref=e80]:
                  - text: FI / CO
                  - generic [ref=e81]: 98%
                - generic [ref=e83]:
                  - text: MM / SD
                  - generic [ref=e84]: 95%
                - generic [ref=e86]:
                  - text: PP / QM
                  - generic [ref=e87]: 92%
                - generic [ref=e89]:
                  - text: BTP / CPI
                  - generic [ref=e90]: 99%
          - generic [ref=e91]:
            - generic [ref=e92]: 62%
            - generic [ref=e96]:
              - generic [ref=e97]: Migration Phase
              - generic [ref=e98]: Week 9 of 16 Complete
          - generic [ref=e104]:
            - generic [ref=e105]: MT940 Automation
            - generic [ref=e106]: 100% Statement Auto-Matched
        - generic [ref=e107]:
          - generic [ref=e108]:
            - generic [ref=e109]: 20+
            - generic [ref=e110]: Years Experience
            - generic [ref=e111]: Senior CA & SAP® Leadership
          - generic [ref=e112]:
            - generic [ref=e113]: 50+
            - generic [ref=e114]: Projects Delivered
            - generic [ref=e115]: Enterprise & Global Groups
          - generic [ref=e116]:
            - generic [ref=e117]: "9"
            - generic [ref=e118]: Specialist Practices
            - generic [ref=e119]: S/4HANA, Cloud, GRC, AMS
          - generic [ref=e120]:
            - generic [ref=e121]: 100%
            - generic [ref=e122]: S/4HANA Certified
            - generic [ref=e123]: Zero Historical Data Loss
    - generic [ref=e125]:
      - generic [ref=e126]: SAP® Cloud & SaaS Solutions
      - generic [ref=e127]: SAP® Analytics & Reporting
      - generic [ref=e128]: SAP® Integration Services
      - generic [ref=e129]: SAP® GRC, Security & Compliance
      - generic [ref=e130]: SAP® Training & Enablement
      - generic [ref=e131]: S/4HANA Upgrade & Migration
      - generic [ref=e132]: SAP® Implementation & Rollout
      - generic [ref=e133]: Application Management Services (AMS)
      - generic [ref=e134]: SAP® Centre of Excellence (CoE)
      - generic [ref=e135]: SAP® FICO · MM · SD · PP · HR
      - generic [ref=e136]: SAP® Cloud & SaaS Solutions
      - generic [ref=e137]: SAP® Analytics & Reporting
      - generic [ref=e138]: SAP® Integration Services
      - generic [ref=e139]: SAP® GRC, Security & Compliance
      - generic [ref=e140]: SAP® Training & Enablement
      - generic [ref=e141]: S/4HANA Upgrade & Migration
      - generic [ref=e142]: SAP® Implementation & Rollout
      - generic [ref=e143]: Application Management Services (AMS)
      - generic [ref=e144]: SAP® Centre of Excellence (CoE)
      - generic [ref=e145]: SAP® FICO · MM · SD · PP · HR
    - generic [ref=e147]:
      - generic [ref=e148]:
        - text: Limited Project Slots · Act Now
        - heading "ECC to S/4HANA Brownfield Migration in Just 16 Weeks*" [level=2] [ref=e149]
        - paragraph [ref=e150]: SAP® will end mainstream maintenance for ECC in December 2027. Our accelerated Brownfield conversion brings your existing ECC system to S/4HANA in 16 weeks* at ~40% lower cost — preserving all data, custom code, and business processes.
      - generic [ref=e151]:
        - generic [ref=e152]:
          - generic [ref=e153]: 16wks*
          - generic [ref=e154]: Fastest Delivery
          - generic [ref=e155]: Guaranteed Benchmark
        - generic [ref=e156]:
          - generic [ref=e157]: ~40%
          - generic [ref=e158]: Cost Savings
          - generic [ref=e159]: Guaranteed Benchmark
        - generic [ref=e160]:
          - generic [ref=e161]: "0"
          - generic [ref=e162]: Data Loss
          - generic [ref=e163]: Guaranteed Benchmark
      - generic [ref=e165]:
        - generic [ref=e166]:
          - text: Automated Migration Pipeline
          - heading "ECC 6.0 to SAP® S/4HANA Conversion Flow" [level=3] [ref=e167]
          - paragraph [ref=e168]: End-to-end database, code adaptation, and Universal Journal simplification with zero data loss.
        - generic [ref=e169]:
          - generic [ref=e170]:
            - generic [ref=e171]:
              - text: 01Legacy Core
              - heading "SAP® ECC 6.0" [level=4] [ref=e172]
              - paragraph [ref=e173]: Dispersed relational tables (BSEG, BSIS, BSAS), disk bottlenecks, and non-HANA custom ABAP code.
            - generic [ref=e174]:
              - generic [ref=e175]: • AnyDB (Oracle/SQL/DB2)
              - generic [ref=e176]: • Classical GUI transactions
              - generic [ref=e177]: • Redundant index tables
          - generic [ref=e178]:
            - generic [ref=e179]: XPMIND 16-Week Accelerated Engine
            - generic [ref=e180]:
              - generic [ref=e181]:
                - generic [ref=e182]: "1"
                - generic [ref=e183]:
                  - generic [ref=e184]: SUM with DMO Execution
                  - generic [ref=e185]: One-step database migration & Unicode conversion
              - generic [ref=e186]:
                - generic [ref=e187]: "2"
                - generic [ref=e188]:
                  - generic [ref=e189]: Custom ABAP HANA Optimization
                  - generic [ref=e190]: Quick-fix syntax adaptation & SQL tuning
              - generic [ref=e191]:
                - generic [ref=e192]: "3"
                - generic [ref=e193]:
                  - generic [ref=e194]: Finance Simplification (ACDOCA)
                  - generic [ref=e195]: Consolidation of FI + CO into single source of truth
              - generic [ref=e196]:
                - generic [ref=e197]: "4"
                - generic [ref=e198]:
                  - generic [ref=e199]: Business Partner (BP) CVI
                  - generic [ref=e200]: Automated Customer-Vendor Integration mapping
            - generic [ref=e201]: Zero Historical Data Loss~40% Lower TCO
          - generic [ref=e202]:
            - generic [ref=e203]:
              - text: 02Target Intelligent Core
              - heading "SAP® S/4HANA" [level=4] [ref=e204]
              - paragraph [ref=e205]: In-memory HANA columnar database, Universal Journal (ACDOCA), role-based Fiori UX, and BTP integration.
            - generic [ref=e206]:
              - generic [ref=e207]: • HANA In-Memory Engine
              - generic [ref=e208]: • Fiori 3.0 / Intuitive UX
              - generic [ref=e209]: • Embedded AI & SAC Analytics
      - generic [ref=e210]:
        - generic [ref=e211]:
          - text: "01"
          - heading "All Data Preserved" [level=4] [ref=e212]
          - paragraph [ref=e213]: Complete historical database converted in-place with zero data loss.
        - generic [ref=e214]:
          - text: "02"
          - heading "Customisations Retained" [level=4] [ref=e215]
          - paragraph [ref=e216]: Existing ABAP Z-programs and workflows remediated and preserved.
        - generic [ref=e217]:
          - text: "03"
          - heading "Minimal Re-Training" [level=4] [ref=e218]
          - paragraph [ref=e219]: Processes remain familiar; users quickly adopt modern SAP® Fiori UX.
        - generic [ref=e220]:
          - text: "04"
          - heading "Faster Time to Value" [level=4] [ref=e221]
          - paragraph [ref=e222]: Live in months, not years — at a fraction of greenfield reimplementation cost.
      - generic [ref=e223]:
        - generic [ref=e224]:
          - generic [ref=e225]: SAP® ECC Maintenance Ends 2027 · Secure Your Slot Today
          - generic [ref=e226]: Preserve all historical records, eliminate custom code debt, and lock in guaranteed timelines.
        - link "See Migration Details →" [ref=e227] [cursor=pointer]:
          - /url: /s4hana-migration
    - generic [ref=e232]:
      - generic [ref=e233]:
        - generic [ref=e234]: Why Choose Us
        - heading "Why Leading Enterprises Choose XpmindGlobal" [level=2] [ref=e235]
        - paragraph [ref=e236]: A dedicated SAP® specialist firm combining Chartered Accountant business rigor with deep technical architecture mastery.
      - generic [ref=e237]:
        - generic [ref=e238]:
          - text: Functional Precision
          - heading "Fiori Cockpits Built for Executive Decision-Makers" [level=3] [ref=e239]
          - paragraph [ref=e240]: Combining Chartered Accountant financial rigor with SAP® technical mastery so your dashboards deliver statutory clarity from day one.
        - generic [ref=e242]:
          - generic [ref=e243]:
            - generic [ref=e244]:
              - generic [ref=e245]: Finance (FI/CO)01
              - heading "General Ledger Cockpit" [level=4] [ref=e246]
              - paragraph [ref=e247]: Real-time ACDOCA Balances
            - generic [ref=e248]:
              - generic [ref=e249]: 100%Reconciled
              - generic [ref=e250]: +4.2% daily throughput
          - generic [ref=e251]:
            - generic [ref=e252]:
              - generic [ref=e253]: System Conversion02
              - heading "S/4HANA Readiness" [level=4] [ref=e254]
              - paragraph [ref=e255]: Custom Code Adaptation
            - generic [ref=e256]:
              - generic [ref=e257]: 0Syntax Errors
              - generic [ref=e258]: 100% HANA-ready
          - generic [ref=e259]:
            - generic [ref=e260]:
              - generic [ref=e261]: GRC & Security03
              - heading "Access Risk Analysis" [level=4] [ref=e262]
              - paragraph [ref=e263]: GRC Segregation of Duties
            - generic [ref=e264]:
              - generic [ref=e265]: ZeroCritical SoD Violations
              - generic [ref=e266]: SOX / Audit Clean
          - generic [ref=e267]:
            - generic [ref=e268]:
              - generic [ref=e269]: Treasury04
              - heading "MT940 Bank Clearing" [level=4] [ref=e270]
              - paragraph [ref=e271]: Electronic Statements
            - generic [ref=e272]:
              - generic [ref=e273]: 94.6%Auto-Cleared
              - generic [ref=e274]: Same-day cash position
          - generic [ref=e275]:
            - generic [ref=e276]:
              - generic [ref=e277]: Analytics05
              - heading "SAC Executive Insights" [level=4] [ref=e278]
              - paragraph [ref=e279]: Cross-Entity P&L Margin
            - generic [ref=e280]:
              - generic [ref=e281]: +18.4%EBITDA Visibility
              - generic [ref=e282]: Live HANA live-connection
          - generic [ref=e283]:
            - generic [ref=e284]:
              - generic [ref=e285]: Support06
              - heading "Continuous AMS SLA" [level=4] [ref=e286]
              - paragraph [ref=e287]: L1–L3 Operational Health
            - generic [ref=e288]:
              - generic [ref=e289]: 99.98%Contractual Uptime
              - generic [ref=e290]: 24×7 War Room Active
      - generic [ref=e291]:
        - generic [ref=e292]:
          - generic [ref=e293]:
            - generic [ref=e294]: "01"
            - heading "Deep SAP® Specialisation" [level=3] [ref=e295]
            - paragraph [ref=e296]: We do not dilute our focus. Every consultant on our team is dedicated exclusively to the SAP® ecosystem, bringing deep technical and functional knowledge across ECC and S/4HANA.
          - generic [ref=e297]: SAP® Specialisation
        - generic [ref=e299]:
          - generic [ref=e300]:
            - generic [ref=e301]: "02"
            - heading "Finance-First Perspective" [level=3] [ref=e302]
            - paragraph [ref=e303]: Founded by Chartered Accountants, we see SAP® through a financial lens. We ensure your system delivers accurate reporting, robust internal controls, and real bottom-line value.
          - generic [ref=e304]: SAP® Specialisation
        - generic [ref=e306]:
          - generic [ref=e307]:
            - generic [ref=e308]: "03"
            - heading "Outcome-Focused Delivery" [level=3] [ref=e309]
            - paragraph [ref=e310]: We measure success by business outcomes — not hours billed. Our fixed-scope deliverables and phase-gated methodologies give you predictability in timeline and cost.
          - generic [ref=e311]: SAP® Specialisation
        - generic [ref=e313]:
          - generic [ref=e314]:
            - generic [ref=e315]: "04"
            - heading "Reusable Accelerators" [level=3] [ref=e316]
            - paragraph [ref=e317]: Our proprietary library of migration tools, integration templates, and custom reports cuts project timelines by up to 40% compared to building from scratch.
          - generic [ref=e318]: SAP® Specialisation
        - generic [ref=e320]:
          - generic [ref=e321]:
            - generic [ref=e322]: "05"
            - heading "Offshore Advantage" [level=3] [ref=e323]
            - paragraph [ref=e324]: High-calibre Indian delivery teams working at competitive rates provide round-the-clock coverage, rapid turnaround, and significant cost savings for global clients.
          - generic [ref=e325]: SAP® Specialisation
        - generic [ref=e327]:
          - generic [ref=e328]:
            - generic [ref=e329]: "06"
            - heading "Long-Term Partnership" [level=3] [ref=e330]
            - paragraph [ref=e331]: We are built for enduring relationships. From initial implementation to ongoing AMS and Centre of Excellence governance, we grow with your business.
          - generic [ref=e332]: SAP® Specialisation
      - generic [ref=e335]:
        - generic [ref=e336]:
          - text: Full Functional Scope
          - heading "SAP® Module Constellation" [level=3] [ref=e337]
          - paragraph [ref=e338]: Select any core SAP® functional discipline to view implementation depth.
        - generic [ref=e339]:
          - button "FI" [ref=e340]
          - button "CO" [ref=e341]
          - button "MM" [ref=e342]
          - button "SD" [ref=e343]
          - button "PP" [ref=e344]
          - button "QM" [ref=e345]
          - button "HR" [ref=e346]
          - button "PS" [ref=e347]
          - button "PM" [ref=e348]
          - button "AM" [ref=e349]
        - generic [ref=e350]:
          - generic [ref=e351]:
            - generic [ref=e352]:
              - generic [ref=e353]: SAP® FI
              - heading "Financial Accounting" [level=4] [ref=e354]
            - paragraph [ref=e355]: General Ledger, AP, AR, Asset Accounting, statutory GSTN compliance
          - generic [ref=e356]: In-house CA & Functional Practice Lead
    - generic [ref=e358]:
      - generic [ref=e359]:
        - generic [ref=e360]: Our Services
        - heading "Enterprise SAP® Consulting & Technical Delivery" [level=2] [ref=e361]
        - paragraph [ref=e362]: Nine core practices spanning the entire SAP® lifecycle. Led by senior practitioners with deep functional and financial acumen.
      - generic [ref=e363]:
        - generic [ref=e364]:
          - generic [ref=e365]:
            - img "SAP® Cloud & SaaS Solutions" [ref=e366]
            - text: Fastest Growing SAP® Segment01
          - generic [ref=e367]:
            - generic [ref=e368]:
              - heading "SAP® Cloud & SaaS Solutions" [level=3] [ref=e369]
              - paragraph [ref=e370]: Modernise enterprise operations with SAP® BTP, Rise with SAP®, and cloud hyperscalers to unlock scalable agility.
              - list [ref=e371]:
                - listitem [ref=e372]: SAP® BTP (Business Technology Platform) advisory and implementation
                - listitem [ref=e376]: Rise with SAP® cloud migration and managed services
                - listitem [ref=e380]: SAP® SuccessFactors HCM cloud deployment
            - link "Explore practice & scope" [ref=e385] [cursor=pointer]:
              - /url: /services/sap-cloud-saas-solutions
        - generic [ref=e388]:
          - generic [ref=e389]:
            - img "SAP® Analytics & Reporting" [ref=e390]
            - text: CFO & COO Priority02
          - generic [ref=e391]:
            - generic [ref=e392]:
              - heading "SAP® Analytics & Reporting" [level=3] [ref=e393]
              - paragraph [ref=e394]: Actionable executive dashboards, state-wise GSTN compliance, SAC, and BW/4HANA deep financial analytics.
              - list [ref=e395]:
                - listitem [ref=e396]: SAP® Analytics Cloud (SAC) dashboard design & implementation
                - listitem [ref=e400]: Customised financial and operational reports (FICO, MM, SD, PP)
                - listitem [ref=e404]: Inter-company reconciliation and automated reporting
            - link "Explore practice & scope" [ref=e409] [cursor=pointer]:
              - /url: /services/sap-analytics-reporting
        - generic [ref=e412]:
          - generic [ref=e413]:
            - img "SAP® Integration Services" [ref=e414]
            - text: Enterprise Connectivity03
          - generic [ref=e415]:
            - generic [ref=e416]:
              - heading "SAP® Integration Services" [level=3] [ref=e417]
              - paragraph [ref=e418]: Seamless real-time connectivity between SAP® and external platforms via SAP® CPI, PI/PO, REST/SOAP, and MT940.
              - list [ref=e419]:
                - listitem [ref=e420]: SAP® CPI (Cloud Platform Integration) and PI/PO integration flows
                - listitem [ref=e424]: Third-party portal to SAP® master data integration (e.g. VRF portal)
                - listitem [ref=e428]: Automated bank reconciliation via MT940 electronic statements
            - link "Explore practice & scope" [ref=e433] [cursor=pointer]:
              - /url: /services/sap-integration-services
        - generic [ref=e436]:
          - generic [ref=e437]:
            - img "SAP® GRC, Security & Compliance" [ref=e438]
            - text: Regulatory Non-Negotiable04
          - generic [ref=e439]:
            - generic [ref=e440]:
              - heading "SAP® GRC, Security & Compliance" [level=3] [ref=e441]
              - paragraph [ref=e442]: Complete SOX, GSTN, and GDPR audit readiness with role engineering, Access Control, and Segregation of Duties (SoD).
              - list [ref=e443]:
                - listitem [ref=e444]: SAP® Access Control (AC) and Process Control (PC) implementation
                - listitem [ref=e448]: Segregation of Duties (SoD) analysis and remediation
                - listitem [ref=e452]: Role redesign, user provisioning, and authorization management
            - link "Explore practice & scope" [ref=e457] [cursor=pointer]:
              - /url: /services/sap-grc-security-compliance
        - generic [ref=e460]:
          - generic [ref=e461]:
            - img "SAP® Training & Enablement" [ref=e462]
            - text: Scalable & High-Margin05
          - generic [ref=e463]:
            - generic [ref=e464]:
              - heading "SAP® Training & Enablement" [level=3] [ref=e465]
              - paragraph [ref=e466]: Structured knowledge transfer and practitioner training by XPMIND Learning Cell for teams, CAs, and business leaders.
              - list [ref=e467]:
                - listitem [ref=e468]: Customised corporate training programs for end users and power users
                - listitem [ref=e472]: Role-based SAP® Fiori and S/4HANA user transition workshops
                - listitem [ref=e476]: Finance-focused SAP® training for Chartered Accountants and finance teams
            - link "Explore practice & scope" [ref=e481] [cursor=pointer]:
              - /url: /services/sap-training-enablement
        - generic [ref=e484]:
          - generic [ref=e485]:
            - img "S/4HANA Upgrade & Migration" [ref=e486]
            - text: Time-Bound Market Opportunity06
          - generic [ref=e487]:
            - generic [ref=e488]:
              - heading "S/4HANA Upgrade & Migration" [level=3] [ref=e489]
              - paragraph [ref=e490]: Proven 16-week Brownfield system conversion and Greenfield paths with zero historical data loss and ~40% cost efficiency.
              - list [ref=e491]:
                - listitem [ref=e492]: ECC to S/4HANA Brownfield system conversion (SUM/DMO execution)
                - listitem [ref=e496]: Greenfield implementation for complete process reimagining
                - listitem [ref=e500]: "Finance simplification: New G/L to Universal Journal (ACDOCA) migration"
            - link "Explore practice & scope" [ref=e505] [cursor=pointer]:
              - /url: /services/s4hana-upgrade-migration
        - generic [ref=e508]:
          - generic [ref=e509]:
            - img "SAP® Implementation & Rollout" [ref=e510]
            - text: End-to-End Delivery07
          - generic [ref=e511]:
            - generic [ref=e512]:
              - heading "SAP® Implementation & Rollout" [level=3] [ref=e513]
              - paragraph [ref=e514]: "End-to-end multi-entity SAP® rollouts across core modules: FI, CO, SD, MM, PP, QM, HR, and Plant Maintenance."
              - list [ref=e515]:
                - listitem [ref=e516]: End-to-end SAP® implementations across core modules (FI, CO, MM, SD, PP)
                - listitem [ref=e520]: Multi-company code, multi-plant rollouts for manufacturing and energy
                - listitem [ref=e524]: Business process re-engineering and standardisation
            - link "Explore practice & scope" [ref=e529] [cursor=pointer]:
              - /url: /services/sap-implementation-rollout
        - generic [ref=e532]:
          - generic [ref=e533]:
            - img "Application Management Services (AMS)" [ref=e534]
            - text: Recurring Revenue Cornerstone08
          - generic [ref=e535]:
            - generic [ref=e536]:
              - heading "Application Management Services (AMS)" [level=3] [ref=e537]
              - paragraph [ref=e538]: Predictable 99.9% SLA support, dedicated senior consultant pools, incident management, and ongoing process enhancements.
              - list [ref=e539]:
                - listitem [ref=e540]: L1, L2, and L3 support across all SAP® functional and technical modules
                - listitem [ref=e544]: "Flexible engagement models: dedicated team, shared pool, or on-demand tickets"
                - listitem [ref=e548]: Preventive maintenance, patch applications, and system health checks
            - link "Explore practice & scope" [ref=e553] [cursor=pointer]:
              - /url: /services/application-management-services-ams
        - generic [ref=e556]:
          - generic [ref=e557]:
            - img "SAP® Centre of Excellence (CoE)" [ref=e558]
            - text: Premium Strategic Engagement09
          - generic [ref=e559]:
            - generic [ref=e560]:
              - heading "SAP® Centre of Excellence (CoE)" [level=3] [ref=e561]
              - paragraph [ref=e562]: Strategic governance, architecture steering, and long-term capability building that reduces SAP® TCO by 20–35%.
              - list [ref=e563]:
                - listitem [ref=e564]: CoE charter design, organizational structure, and governance model
                - listitem [ref=e568]: Architecture review board establishment and technology roadmap planning
                - listitem [ref=e572]: Demand management, project prioritization, and resource allocation
            - link "Explore practice & scope" [ref=e577] [cursor=pointer]:
              - /url: /services/sap-centre-of-excellence-coe
      - generic [ref=e580]:
        - generic [ref=e581]:
          - generic [ref=e582]: Flexible Engagement Models
          - heading "Two Ways We Partner With Your Enterprise" [level=2] [ref=e583]
          - paragraph [ref=e584]: Whether you need a high-impact, fixed-scope transformation or ongoing 24×7 operational excellence with strict SLAs.
        - generic [ref=e585]:
          - generic [ref=e586]:
            - generic [ref=e587]:
              - generic [ref=e588]: Path 01 · Milestone-Driven
              - heading "Strategic Project Delivery" [level=3] [ref=e589]
              - paragraph [ref=e590]: Fixed-scope, fixed-cost enterprise implementations and upgrades executed with phase-gated precision. Ideal for organisations with defined timelines and board-mandated milestones.
              - list [ref=e591]:
                - listitem [ref=e592]: 16-Week ECC to S/4HANA Brownfield conversion
                - listitem [ref=e596]: Multi-entity Greenfield implementations across FI, CO, MM, SD, PP
                - listitem [ref=e600]: BTP, CPI, and third-party API interface integration
                - listitem [ref=e604]: Fixed-fee governance with zero hidden change-orders
                - listitem [ref=e608]: 4-week hypercare support included post-cutover
            - link "Explore Migration & Projects" [ref=e613] [cursor=pointer]:
              - /url: /services/s4hana-upgrade-migration
          - generic [ref=e617]:
            - generic [ref=e618]:
              - generic [ref=e619]: Path 02 · Continuous SLA
              - heading "Managed Services & AMS" [level=3] [ref=e620]
              - paragraph [ref=e621]: Continuous enterprise peace of mind backed by contractual 99.9% uptime SLAs. A dedicated pool of senior CA and SAP® certified consultants supporting your operations 24×7.
              - list [ref=e622]:
                - listitem [ref=e623]: L1–L3 24×7 multi-tier support across all core modules
                - listitem [ref=e627]: Proactive monthly patch management and security health audits
                - listitem [ref=e631]: "Flexible models: dedicated squad, shared pool, or ticket bundles"
                - listitem [ref=e635]: Direct access to Chartered Accountant SAP® specialists
                - listitem [ref=e639]: Predictable monthly OPEX pricing with no lock-in traps
            - link "Explore AMS & Support Models" [ref=e644] [cursor=pointer]:
              - /url: /services/application-management-services-ams
    - generic [ref=e649]:
      - generic [ref=e650]:
        - generic [ref=e651]: Industries We Serve
        - heading "Specialised SAP® Domain Expertise" [level=2] [ref=e652]
        - paragraph [ref=e653]: Deep sectoral understanding across high-compliance manufacturing, renewable energy, and FMCG supply chains.
      - generic [ref=e654]:
        - generic [ref=e655]:
          - generic [ref=e656]:
            - generic [ref=e657]:
              - img "Manufacturing" [ref=e658]
              - text: Sector Specialization
              - heading "Manufacturing" [level=3] [ref=e660]
            - generic [ref=e661]:
              - generic [ref=e662]:
                - paragraph [ref=e663]: End-to-end production planning, bill of materials management, shop floor integration, standard costing, and supply chain visibility.
                - generic [ref=e664]:
                  - text: Key Highlights
                  - generic [ref=e665]: Shop floor bill of materials (BOM) & capacity routing
                  - generic [ref=e669]: Real-time scrap analysis & standard costing
                  - generic [ref=e673]: Multi-plant inventory valuation & PP integration
              - generic [ref=e677]:
                - text: Modules Deployed
                - generic [ref=e678]: PP · MM · FI · CO · QM
          - generic [ref=e679]:
            - generic [ref=e680]:
              - img "Power & Energy" [ref=e681]
              - text: Sector Specialization
              - heading "Power & Energy" [level=3] [ref=e683]
            - generic [ref=e684]:
              - generic [ref=e685]:
                - paragraph [ref=e686]: Multi-plant operations, asset management, complex regulatory compliance, project accounting, and high-volume vendor management.
                - generic [ref=e687]:
                  - text: Key Highlights
                  - generic [ref=e688]: Capital expenditure & multi-plant asset management
                  - generic [ref=e692]: High-volume vendor invoice clearance & MT940
                  - generic [ref=e696]: Regulatory Indian GAAP & GSTN tax compliance
              - generic [ref=e700]:
                - text: Modules Deployed
                - generic [ref=e701]: AM · PM · PS · FI · CO
          - generic [ref=e702]:
            - generic [ref=e703]:
              - img "FMCG" [ref=e704]
              - text: Sector Specialization
              - heading "FMCG" [level=3] [ref=e706]
            - generic [ref=e707]:
              - generic [ref=e708]:
                - paragraph [ref=e709]: Trade spend management, multi-channel distribution, high-volume order-to-cash, batch management, and real-time inventory tracking.
                - generic [ref=e710]:
                  - text: Key Highlights
                  - generic [ref=e711]: High-speed order-to-cash & trade spend management
                  - generic [ref=e715]: Batch management & multi-channel distribution
                  - generic [ref=e719]: State-wise GSTN compliance & automated reconciliations
              - generic [ref=e723]:
                - text: Modules Deployed
                - generic [ref=e724]: SD · MM · FI · CO · SAC
        - button "Scroll left" [disabled] [ref=e725]
        - button "Scroll right" [ref=e728]
    - generic [ref=e732]:
      - generic [ref=e733]:
        - generic [ref=e734]:
          - generic [ref=e735]: Case Studies
          - heading "Proven Results Across Complex SAP® Landscapes" [level=2] [ref=e736]
          - paragraph [ref=e737]: Explore how our specialist consultants solve complex integration, migration, and automation challenges.
        - link "View All 5 Case Studies" [ref=e738] [cursor=pointer]:
          - /url: /projects
      - generic [ref=e742]:
        - generic [ref=e743]:
          - generic [ref=e744]:
            - generic [ref=e745]:
              - img "Fund Management End-to-End Process Automation" [ref=e746]
              - text: Finance Automation
            - generic [ref=e747]:
              - generic [ref=e748]:
                - heading "Fund Management End-to-End Process Automation" [level=3] [ref=e749]
                - paragraph [ref=e750]: Automated complex multi-entity fund allocations, cash flow monitoring, and bank postings with zero manual intervention.
                - generic [ref=e751]:
                  - text: Key Outcomes
                  - generic [ref=e752]: Automated end-to-end fund allocation and monitoring process across business units
                  - generic [ref=e756]: Eliminated 95% of manual journal entries through automated posting logic
              - generic [ref=e760]:
                - text: Fund Management (FM)
                - link "Read Case Study" [ref=e761] [cursor=pointer]:
                  - /url: /projects/fund-management-automation
          - generic [ref=e764]:
            - generic [ref=e765]:
              - img "PR & PO Release Strategy Across 50+ Company Codes" [ref=e766]
              - text: Materials Management
            - generic [ref=e767]:
              - generic [ref=e768]:
                - heading "PR & PO Release Strategy Across 50+ Company Codes" [level=3] [ref=e769]
                - paragraph [ref=e770]: Standardised procurement authorization across 50+ entities with multi-tier approval matrices and role-based controls.
                - generic [ref=e771]:
                  - text: Key Outcomes
                  - generic [ref=e772]: Standardised PR and PO release strategies across 50+ company codes globally
                  - generic [ref=e776]: Implemented multi-level approval hierarchies based on financial thresholds and cost centres
              - generic [ref=e780]:
                - text: Materials Management (MM)
                - link "Read Case Study" [ref=e781] [cursor=pointer]:
                  - /url: /projects/pr-po-release-strategy
          - generic [ref=e784]:
            - generic [ref=e785]:
              - img "VRF Portal Integration & Vendor Master Automation" [ref=e786]
              - text: Integration Services
            - generic [ref=e787]:
              - generic [ref=e788]:
                - heading "VRF Portal Integration & Vendor Master Automation" [level=3] [ref=e789]
                - paragraph [ref=e790]: Connected external third-party vendor onboarding portal directly to SAP® Vendor Master with zero manual data entry.
                - generic [ref=e791]:
                  - text: Key Outcomes
                  - generic [ref=e792]: Seamless bi-directional integration between third-party VRF portal and SAP® Vendor Master
                  - generic [ref=e796]: Eliminated manual vendor onboarding data entry, reducing human error to zero
              - generic [ref=e800]:
                - text: Third-party Portal ↔ SAP® Vendor Master
                - link "Read Case Study" [ref=e801] [cursor=pointer]:
                  - /url: /projects/vrf-portal-integration
          - generic [ref=e804]:
            - generic [ref=e805]:
              - img "SAP® Implementation — Solar Manufacturing (Multi-Plant)" [ref=e806]
              - text: Full-Lifecycle ERP
            - generic [ref=e807]:
              - generic [ref=e808]:
                - heading "SAP® Implementation — Solar Manufacturing (Multi-Plant)" [level=3] [ref=e809]
                - paragraph [ref=e810]: Full lifecycle SAP® deployment across multiple manufacturing facilities from shop floor bill of materials to CFO dashboard.
                - generic [ref=e811]:
                  - text: Key Outcomes
                  - generic [ref=e812]: End-to-end SAP® ERP implementation across multiple solar manufacturing facilities
                  - generic [ref=e816]: Full integration of Production Planning (PP), Materials Management (MM), and Finance (FI)
              - generic [ref=e820]:
                - text: Solar Energy & Renewable Manufacturing
                - link "Read Case Study" [ref=e821] [cursor=pointer]:
                  - /url: /projects/solar-manufacturing-implementation
          - generic [ref=e824]:
            - generic [ref=e825]:
              - img "Bank Reconciliation Automation via MT940 Electronic Statements" [ref=e826]
              - text: Cash & Treasury
            - generic [ref=e827]:
              - generic [ref=e828]:
                - heading "Bank Reconciliation Automation via MT940 Electronic Statements" [level=3] [ref=e829]
                - paragraph [ref=e830]: Automated statement ingestion, transaction matching, and auto-clearing via MT940 formats across multiple major banks.
                - generic [ref=e831]:
                  - text: Key Outcomes
                  - generic [ref=e832]: Automated MT940 electronic bank statement upload and transaction matching
                  - generic [ref=e836]: Auto-clearing rate of over 92% on daily transaction volumes
              - generic [ref=e840]:
                - text: MT940 Electronic Bank Statements
                - link "Read Case Study" [ref=e841] [cursor=pointer]:
                  - /url: /projects/bank-reconciliation-automation
        - button "Scroll left" [disabled] [ref=e844]
        - button "Scroll right" [ref=e847]
    - generic [ref=e851]:
      - generic [ref=e852]:
        - generic [ref=e853]: Frequently Asked Questions
        - heading "Everything You Need to Know About SAP® Engagements" [level=2] [ref=e854]
        - paragraph [ref=e855]: Clear, direct answers to common questions regarding timelines, data safety, and execution models.
      - generic [ref=e857]:
        - button "What is the difference between Brownfield and Greenfield migration?" [ref=e859]
        - button "Is 16 weeks really achievable? What are the conditions?" [ref=e863]
        - button "Will I lose any data during migration?" [ref=e867]
        - button "Which versions of SAP® ECC are supported for brownfield migration?" [ref=e871]
        - button "What happens to my custom ABAP code and Z-programs?" [ref=e875]
        - button "How much system downtime is required at go-live cutover?" [ref=e879]
    - generic [ref=e884]:
      - generic [ref=e885]: Start Your Enterprise Transformation
      - heading "Ready to unlock the full power of SAP® for your business?" [level=2] [ref=e886]
      - paragraph [ref=e887]: Talk to our senior SAP® consultants today. We'll assess your current landscape and provide an honest, actionable roadmap — no commitment required.
      - generic [ref=e888]:
        - button "Get a Free Assessment →" [ref=e889]
        - link "View All Services" [ref=e893] [cursor=pointer]:
          - /url: /services
      - generic [ref=e894]:
        - generic [ref=e898]:
          - text: "Direct:"
          - link "+91 9711011844" [ref=e899] [cursor=pointer]:
            - /url: tel:+919711011844
        - generic [ref=e904]:
          - text: "Inquiries:"
          - link "info@xpmindglobal.com" [ref=e905] [cursor=pointer]:
            - /url: mailto:info@xpmindglobal.com
  - contentinfo [ref=e906]:
    - generic [ref=e907]:
      - generic [ref=e908]:
        - generic [ref=e909]:
          - link [ref=e910] [cursor=pointer]:
            - /url: /
            - img "XpmindGlobal" [ref=e912]
          - paragraph [ref=e913]: XpmindGlobal is a specialist SAP® consulting firm founded by Chartered Accountants and SAP®-certified professionals with 20+ years of experience. Serving Manufacturing, FMCG, and Power & Energy.
          - generic [ref=e914]:
            - generic [ref=e918]:
              - link "+91 9711011844" [ref=e919] [cursor=pointer]:
                - /url: tel:+919711011844
              - text: "|"
              - link "+91 9910003017" [ref=e920] [cursor=pointer]:
                - /url: tel:+919910003017
            - link "120-5106972" [ref=e924] [cursor=pointer]:
              - /url: tel:01205106972
            - link "info@xpmindglobal.com" [ref=e929] [cursor=pointer]:
              - /url: mailto:info@xpmindglobal.com
            - generic [ref=e930]: Office No. 12110, 12th Floor, Gaur City Mall, Greater Noida West, Ghaziabad, UP - 201318, India
        - generic [ref=e934]:
          - heading "Services" [level=4] [ref=e935]
          - list [ref=e936]:
            - listitem [ref=e937]:
              - link "SAP® Cloud & SaaS" [ref=e938] [cursor=pointer]:
                - /url: /services/sap-cloud-saas-solutions
            - listitem [ref=e939]:
              - link "SAP® Analytics" [ref=e940] [cursor=pointer]:
                - /url: /services/sap-analytics-reporting
            - listitem [ref=e941]:
              - link "GRC & Security" [ref=e942] [cursor=pointer]:
                - /url: /services/sap-grc-security-compliance
            - listitem [ref=e943]:
              - link "S/4HANA Migration" [ref=e944] [cursor=pointer]:
                - /url: /services/s4hana-upgrade-migration
            - listitem [ref=e945]:
              - link "AMS Support" [ref=e946] [cursor=pointer]:
                - /url: /services/application-management-services-ams
            - listitem [ref=e947]:
              - link "ECC → S/4HANA Migration" [ref=e948] [cursor=pointer]:
                - /url: /s4hana-migration
        - generic [ref=e949]:
          - heading "Company" [level=4] [ref=e950]
          - list [ref=e951]:
            - listitem [ref=e952]:
              - link "About Us" [ref=e953] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e954]:
              - link "Our Team" [ref=e955] [cursor=pointer]:
                - /url: /about#leadership
            - listitem [ref=e956]:
              - link "Case Studies" [ref=e957] [cursor=pointer]:
                - /url: /projects
            - listitem [ref=e958]:
              - link "Training" [ref=e959] [cursor=pointer]:
                - /url: /training
            - listitem [ref=e960]:
              - link "Contact Us" [ref=e961] [cursor=pointer]:
                - /url: /contact
        - generic [ref=e962]:
          - heading "Contact" [level=4] [ref=e963]
          - list [ref=e964]:
            - listitem [ref=e965]:
              - link "+91 9711011844" [ref=e966] [cursor=pointer]:
                - /url: tel:+919711011844
            - listitem [ref=e967]:
              - link "+91 9910003017" [ref=e968] [cursor=pointer]:
                - /url: tel:+919910003017
            - listitem [ref=e969]:
              - link "120-5106972" [ref=e970] [cursor=pointer]:
                - /url: tel:01205106972
            - listitem [ref=e971]:
              - link "info@xpmindglobal.com" [ref=e972] [cursor=pointer]:
                - /url: mailto:info@xpmindglobal.com
      - generic [ref=e973]:
        - generic [ref=e974]: © 2026 XpmindGlobal. All rights reserved. Registered in India.
        - generic [ref=e975]: SAP® Consulting · Greater Noida · India
      - generic [ref=e976]: SAP®, SAP S/4HANA®, SAP BTP®, SAP Fiori®, SAP Ariba®, Rise with SAP®, and other SAP products and services mentioned herein as well as their respective logos are trademarks or registered trademarks of SAP SE in Germany and in several other countries. XpmindGlobal is an independent enterprise consulting firm and is not affiliated with, sponsored by, or endorsed by SAP SE.
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import path from "path";
  3   | import { SERVICE_SLUGS } from "./routes";
  4   | 
  5   | /**
  6   |  * Services dropdown — click-only, real-interaction verification.
  7   |  *
  8   |  * Root causes this suite guards against:
  9   |  *   1. The panel inherited `pointer-events: none` from the fixed header wrapper,
  10  |  *      so mouse travel and clicks fell through to the scrim behind it.
  11  |  *   2. The scrim (later sibling, higher effective stacking) swallowed clicks on
  12  |  *      the panel's <Link> items, so nothing ever navigated.
  13  |  *   3. The old hover open/close timers turned the 12px bar→panel gap into a dead
  14  |  *      zone that closed the panel mid-travel.
  15  |  */
  16  | 
  17  | const SHOTS = path.join(process.cwd(), "reference", "verify");
  18  | 
  19  | const PANEL = "#services-dropdown-panel";
  20  | const TRIGGER = "#services-dropdown-trigger";
  21  | const SCROLL = ".services-dropdown-scroll";
  22  | const STRIP = `${PANEL} a[href='/s4hana-migration']`;
  23  | 
  24  | /** Only the two desktop projects in the brief expose the centre pill. */
  25  | const DESKTOP_PROJECTS = ["Desktop 1440x900", "Desktop 1366x768"];
  26  | 
  27  | async function openPanel(page: Page) {
  28  |   await page.locator(TRIGGER).click();
  29  |   await expect(page.locator(PANEL)).toBeVisible({ timeout: 300 });
  30  | }
  31  | 
  32  | test.describe("Services dropdown (click-only)", () => {
  33  |   let errors: string[] = [];
  34  | 
  35  |   test.beforeEach(async ({ page }, testInfo) => {
  36  |     test.skip(!DESKTOP_PROJECTS.includes(testInfo.project.name), "Centre pill only exists at lg+");
  37  |     errors = [];
  38  |     page.on("console", (msg) => {
  39  |       if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  40  |     });
  41  |     page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  42  |   });
  43  | 
  44  |   for (const route of ["/", "/services/sap-centre-of-excellence-coe"] as const) {
  45  |     test(`1 · click opens within 300ms, stays open 2s, mouse travels in — ${route}`, async ({
  46  |       page,
  47  |     }, testInfo) => {
  48  |       await page.goto(route, { waitUntil: "networkidle" });
  49  | 
  50  |       const trigger = page.locator(TRIGGER);
  51  |       const panel = page.locator(PANEL);
  52  | 
> 53  |       await trigger.click();
      |                     ^ Error: locator.click: Test timeout of 60000ms exceeded.
  54  |       await expect(panel).toBeVisible({ timeout: 300 });
  55  | 
  56  |       // The open state must never be stuck at opacity: 0.
  57  |       await expect
  58  |         .poll(() => panel.evaluate((el) => getComputedStyle(el).opacity), { timeout: 1000 })
  59  |         .toBe("1");
  60  | 
  61  |       // No mouse movement for 2 seconds — it must still be open (no hover timer).
  62  |       await page.waitForTimeout(2000);
  63  |       await expect(panel).toBeVisible();
  64  | 
  65  |       // Real mouse travel from the trigger centre to the first service item, 15 steps.
  66  |       const tBox = (await trigger.boundingBox())!;
  67  |       const firstItem = page.locator(`${PANEL} ${SCROLL} a`).first();
  68  |       const fBox = (await firstItem.boundingBox())!;
  69  |       const sx = tBox.x + tBox.width / 2;
  70  |       const sy = tBox.y + tBox.height / 2;
  71  |       const ex = fBox.x + fBox.width / 2;
  72  |       const ey = fBox.y + fBox.height / 2;
  73  | 
  74  |       for (let i = 1; i <= 15; i++) {
  75  |         await page.mouse.move(sx + ((ex - sx) * i) / 15, sy + ((ey - sy) * i) / 15, { steps: 1 });
  76  |         await expect(panel, `panel must stay open at travel step ${i}`).toBeVisible();
  77  |       }
  78  | 
  79  |       const endHit = await page.evaluate(
  80  |         ({ x, y }) => {
  81  |           const p = document.getElementById("services-dropdown-panel")!;
  82  |           const el = document.elementFromPoint(x, y);
  83  |           return { inside: !!(el && p.contains(el)), tag: el?.tagName ?? "null" };
  84  |         },
  85  |         { x: ex, y: ey }
  86  |       );
  87  |       expect(endHit.inside, `elementFromPoint at end of travel hit ${endHit.tag}`).toBe(true);
  88  | 
  89  |       // Hovering every one of the 9 items must apply its hover surface.
  90  |       const items = page.locator(`${PANEL} ${SCROLL} a`);
  91  |       await expect(items).toHaveCount(9);
  92  |       for (let i = 0; i < 9; i++) {
  93  |         const box = (await items.nth(i).boundingBox())!;
  94  |         await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  95  |         await expect
  96  |           .poll(() => items.nth(i).evaluate((el) => getComputedStyle(el).backgroundColor), {
  97  |             message: `item ${i + 1} must show a hover background`,
  98  |           })
  99  |           .not.toBe("rgba(0, 0, 0, 0)");
  100 |       }
  101 | 
  102 |       await expect(panel).toBeVisible();
  103 |       await page.screenshot({
  104 |         path: path.join(SHOTS, `dropdown-fixed-open-${testInfo.project.name.replace(/\s+/g, "-")}.png`),
  105 |       });
  106 | 
  107 |       expect(errors, errors.join("\n")).toEqual([]);
  108 |     });
  109 |   }
  110 | 
  111 |   test("2 · each of the 9 items navigates to /services/[slug] and closes the panel", async ({
  112 |     page,
  113 |   }) => {
  114 |     // Nine full navigations, each possibly compiling a dev-server route.
  115 |     test.slow();
  116 | 
  117 |     const items = page.locator(`${PANEL} ${SCROLL} a`);
  118 | 
  119 |     for (let i = 0; i < SERVICE_SLUGS.length; i++) {
  120 |       const slug = SERVICE_SLUGS[i];
  121 |       await page.goto("/", { waitUntil: "networkidle" });
  122 |       await openPanel(page);
  123 |       await expect(items).toHaveCount(9);
  124 | 
  125 |       await items.nth(i).click();
  126 |       await page.waitForURL((url) => url.pathname === `/services/${slug}`);
  127 | 
  128 |       expect(new URL(page.url()).pathname).toBe(`/services/${slug}`);
  129 |       await expect(page.locator("h1").first()).toBeVisible();
  130 |       await expect(page.locator(PANEL)).toHaveCount(0);
  131 |     }
  132 |   });
  133 | 
  134 |   test("3 · 'Explore All Services' → /services and strip 'Learn more' → /s4hana-migration", async ({
  135 |     page,
  136 |   }) => {
  137 |     await page.goto("/", { waitUntil: "networkidle" });
  138 |     await openPanel(page);
  139 |     await page.locator(`${PANEL} a[href='/services']`).click();
  140 |     await page.waitForURL((url) => url.pathname === "/services");
  141 |     expect(new URL(page.url()).pathname).toBe("/services");
  142 |     await expect(page.locator(PANEL)).toHaveCount(0);
  143 | 
  144 |     await page.goto("/", { waitUntil: "networkidle" });
  145 |     await openPanel(page);
  146 |     await page.locator(STRIP).click();
  147 |     await page.waitForURL((url) => url.pathname === "/s4hana-migration");
  148 |     expect(new URL(page.url()).pathname).toBe("/s4hana-migration");
  149 |     await expect(page.locator(PANEL)).toHaveCount(0);
  150 |   });
  151 | 
  152 |   test("4 · toggle, outside click, ESC focus return, and bar link while open", async ({ page }) => {
  153 |     const panel = page.locator(PANEL);
```